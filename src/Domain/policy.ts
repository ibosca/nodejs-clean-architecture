export class Policy {


  constructor(
    private _id: string,
    private _amountInsured: number,
    private _email: string,
    private _inceptionDate: Date,
    private _installmentPayment: boolean,
    private _clientId: string,
  ) {}


  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get amountInsured(): number {
    return this._amountInsured;
  }

  set amountInsured(value: number) {
    this._amountInsured = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get inceptionDate(): Date {
    return this._inceptionDate;
  }

  set inceptionDate(value: Date) {
    this._inceptionDate = value;
  }

  get installmentPayment(): boolean {
    return this._installmentPayment;
  }

  set installmentPayment(value: boolean) {
    this._installmentPayment = value;
  }

  get clientId(): string {
    return this._clientId;
  }

  set clientId(value: string) {
    this._clientId = value;
  }

  public static fromJson(data: any): Policy {
    return new Policy(
      data.id,
      data.amountInsured,
      data.email,
      new Date(data.inceptionDate),
      data.installmentPayment,
      data.clientId,
    );
  }
}