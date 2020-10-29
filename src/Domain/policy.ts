export class Policy {


  constructor(
    private id: string,
    private amountInsured: number,
    private email: string,
    private inceptionDate: Date,
    private installmentPayment: boolean,
    private clientId: string,
  ) {}

  public getId(): string {
    return this.id;
  }

  public getClientId(): string {
    return this.clientId;
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

  public jsonSerialize(): any {
    return {
      'id': this.id,
      'amountInsured': this.amountInsured,
      'email': this.email,
      'inceptionDate': this.inceptionDate,
      'installmentPayment': this.installmentPayment,
      'clientId': this.clientId
    }
  }
}