"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decisionRules = void 0;
const chalk_1 = __importDefault(require("chalk"));
const mainColor = chalk_1.default.hex('#5b24e4');
const headline = `
 _____            _     _             _____       _             _       
|  __ \\          (_)   (_)           |  __ \\     | |           (_)
| |  | | ___  ___ _ ___ _  ___  _ __ | |__) |   _| | ___  ___   _  ___  
| |  | |/ _ \\/ __| / __| |/ _ \\| '_ \\|  _  / | | | |/ _ \\/ __| | |/ _ \\ 
| |__| |  __/ (__| \\__ \\ | (_) | | | | | \\ \\ |_| | |  __/\\__ \\_| | (_) |
|_____/ \\___|\\___|_|___/_|\\___/|_| |_|_|  \\_\\__,_|_|\\___||___(_)_|\\___/

`;
exports.decisionRules = mainColor(headline);
//# sourceMappingURL=headline.js.map