import { MetadataDto } from "./metadata.dto";

export class AppResponseDto {
  constructor(private meta: MetadataDto, private data: any) {}

  public static notFound(): AppResponseDto {
    const meta = new MetadataDto(404, false, new Error('Not Found'));
    return new AppResponseDto(meta, null);
  }

  public static badRequest(): AppResponseDto {
    const meta = new MetadataDto(400, false, new Error('Bad Request'));
    return new AppResponseDto(meta, null);
  }

  public static ok(data: any): AppResponseDto {
    const meta = new MetadataDto(200, true);
    return new AppResponseDto(meta, data);
  }
}