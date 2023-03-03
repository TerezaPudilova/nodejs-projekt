import {config} from "../config";

export class ConfigFactory {

    constructor() {}

    public static getConfig(){

        const type = process.env.NODE_ENV;

        switch (type) {
            default:
                return config();
        }
    }
}