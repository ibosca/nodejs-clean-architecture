export class MetadataDto {
  constructor(
    private code: number,
    private succeeded: boolean,
    private error?: string,
  ) {
  }
}