import { IsDefined, IsNumber, IsString } from 'class-validator';

export class GeolocationDto {
  @IsString()
  @IsDefined()
  latitude: string;

  @IsString()
  @IsDefined()
  longitude: string;
}
