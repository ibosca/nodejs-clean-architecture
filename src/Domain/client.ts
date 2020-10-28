export class Client {

  private readonly ROLE_ADMIN = 'admin';
  private readonly ROLE_USER = 'user';

  constructor(
    private _id: string,
    private _name: string,
    private _email: string,
    private _role: string,
  ) {}


  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get role(): string {
    return this._role;
  }

  set role(value: string) {
    this._role = value;
  }

  public isRoleAdmin(): boolean {
    return this.role == this.ROLE_ADMIN;
  }

  public isRoleUser(): boolean {
    return this.role == this.ROLE_USER;
  }

  public static fromJson(data: any): Client {
    return new Client(
      data.id,
      data.name,
      data.email,
      data.role
    );
  }
}