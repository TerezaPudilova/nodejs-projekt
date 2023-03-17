import { BaseController } from "./base.controller";
import * as express from "express";
import { RequestHandler } from "express";
import { ConfigFactory } from "../factories/configFactory";
import { UserService } from "../services/user.service";
import { CustomRequest } from "../interfaces/CustomRequest";
import { validationResult } from "express-validator";
import { body } from "express-validator/check";

export class AuthController implements BaseController {
  public router = express.Router();
  path = "/";

  private readonly config = ConfigFactory.getConfig();

  constructor(private userService: UserService) {
    this.initRouter();
  }

  initRouter() {
    this.router.post(
      "/signup",
      [
        body("email")
          .isEmail()
          .withMessage("Email must be in form name@example.com.")
          .custom(async (value, { req }) => {
            await this.userService.findUser(value).then((user) => {
              if (user) {
                return Promise.reject("E-mail address already exists");
              }
            });
          })
          .normalizeEmail(),
        body("password")
          .trim()
          .isLength({ min: 6 })
          .withMessage("Password must have at least 6 characters."),
        body("confirmPassword")
          .trim()
          .custom((value, { req }) => {
            if (value !== req.body.password) {
              throw new Error("Password confirmation does not match password");
            }
            return true;
          }),
      ],
      this.signupHandler
    );
    this.router.post("/login", this.loginHandler);
    this.router.get("/user", this.findUserHandler);
  }

  signupHandler: RequestHandler = async (req, res, next) => {
    const errors = validationResult(req);
    const body = req.body;
    const id = body.id;
    const email = body.email;
    const password = body.password;
    console.log(errors);

    if (!errors.isEmpty()) {
      const error = new Error("Validation failed.");
      error.stack = errors.array().toString();
      res.status(500).json({
        message: "User signup was not succesfull",
        error: errors.array(),
      });
      throw error;
    }
    try {
      await this.userService.signup(id, email, password);
      res.status(200).json({
        message: "User created successfully",
        user: {
          id: id,
          email: email,
        },
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };

  loginHandler: RequestHandler = async (req, res, next) => {
    const body = req.body;
    const email = body.email;
    const password = body.password;
    const loadedUser = await this.userService.login(email, password);
    try {
      //Validace emailu
      const loadedEmail = await this.userService.findUser(email);
      if (!loadedEmail) {
        const error = new Error("Wrong email! Please try again.");
        throw error;
      }
      //Validace hesla
      if (password !== loadedUser.password) {
        const error = new Error("Wrong password! Please try again.");
        throw error;
      }
      res.status(200).json({
        message: "User logged in successfully",
        user: {
          email: email,
          keys: loadedUser.keys,
        },
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };

  findUserHandler: RequestHandler = async (req: CustomRequest, res, next) => {
    const loadedUser = await this.userService.findUser(req.email);
    try {
      res.status(200).json({
        message: "User updated successfully",
        user: {
          email: req.email,
          keys: loadedUser.keys,
        },
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };
}
