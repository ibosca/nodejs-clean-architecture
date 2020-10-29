export class Client {

  private readonly ROLE_ADMIN = 'admin';
  private readonly ROLE_USER = 'user';

  constructor(
    private id: string,
    private name: string,
    private email: string,
    private role: string,
  ) {}

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
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

  public jsonSerialize(): any {
    return {
      'id': this.id,
      'name': this.name,
      'email': this.email,
      'role': this.role,
    };
  }
}