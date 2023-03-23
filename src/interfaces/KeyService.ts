import { BaseKey } from "../models/base-key.model";

export interface KeyServiceInterface {
    getKeys(keyIds: string[], email: string): Promise<BaseKey[]>,
    createKey(key: BaseKey, email: string),
    deleteKey(key: BaseKey, email: string),
    updateKey(key: BaseKey, email: string)
}