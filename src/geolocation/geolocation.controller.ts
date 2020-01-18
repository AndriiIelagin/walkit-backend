import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { GeolocationService } from './geolocation.service';
import { Geolocation } from './geolocation.entity';
import { GeolocationDto } from './dto/geolocation.dto';

@Controller('geolocation')
export class GeolocationController {
  constructor(private readonly geolocationService: GeolocationService) {}

  @Get()
  async findAll(): Promise<Geolocation[]> {
    const geolocations = await this.geolocationService.findAll();
    return geolocations;
  }

  @Get('/:id')
  async findGeolocation(@Param('id') id: string): Promise<Geolocation> {
    const geolocation = this.geolocationService.findGeolocationBy({ id });
    return geolocation;
  }

  @Post()
  async createGeolocation(
    @Body() geolocationData: GeolocationDto,
  ): Promise<Geolocation> {
    const geolocation = await this.geolocationService.addGeolocation(
      geolocationData,
    );
    return geolocation;
  }

  @Put('/:id')
  async updateGeolocation(
    @Body() geolocationData: GeolocationDto,
    @Param('id') id: string,
  ) {
    const updatedGeolocation = this.geolocationService.updateGeolocation(
      geolocationData,
      id,
    );
    return updatedGeolocation;
  }

  @Delete('/:id')
  async deleteGeolocation(@Param('id') id: string) {
    await this.geolocationService.removeGeolocation(id);
  }
}
