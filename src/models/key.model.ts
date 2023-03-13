import { BaseKey } from "./base-key.model";

export class ApiKey extends BaseKey {
  constructor(
    public name: string,
    public type: string,
    public hash: string,
    public id?: string,
  )
  {
    super(id, name, type, hash);
  }
}

export class LicenceKey extends BaseKey {
  constructor(
    public name: string,
    public type: string,
    public hash: string,
    public id?: string,
    public expireDate?: Date,
  ) {
    super(id, name, type, hash);
  }
}
