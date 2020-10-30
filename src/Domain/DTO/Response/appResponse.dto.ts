import { MetadataDto } from "./metadata.dto";

export class AppResponseDto {
  constructor(private meta: MetadataDto, private data: any) {}

  public static notFound(): AppResponseDto {
    const meta = new MetadataDto(404, false, 'Not Found');
    return new AppResponseDto(meta, null);
  }

  public static badRequest(): AppResponseDto {
    const meta = new MetadataDto(400, false, 'Bad Request');
    return new AppResponseDto(meta, null);
  }

  public static ok(data: any): AppResponseDto {
    const meta = new MetadataDto(200, true);
    return new AppResponseDto(meta, data);
  }

  public static created(data: any): AppResponseDto {
    const meta = new MetadataDto(201, true);
    return new AppResponseDto(meta, data);
  }
}