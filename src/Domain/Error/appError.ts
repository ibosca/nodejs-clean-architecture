export class AppError extends Error {
  private readonly status;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }

  getStatus(): number {
    return this.status;
  }
}