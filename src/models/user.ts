export class User {
  constructor(
    public id: string,
    public email: string,
    public keys: string[],
    public password: string
  ) {}
}
