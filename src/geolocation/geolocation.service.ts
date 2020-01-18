import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Geolocation } from './geolocation.entity';
import { GeolocationDto } from './dto/geolocation.dto';

@Injectable()
export class GeolocationService {
  constructor(
    @InjectRepository(Geolocation)
    private readonly geolocationRepository: Repository<Geolocation>,
  ) {}

  async findAll(): Promise<Geolocation[]> {
    const Geolocations = await this.geolocationRepository.find();
    return Geolocations;
  }

  async findGeolocationBy(params): Promise<Geolocation> {
    return await this.geolocationRepository.findOne({
      where: params,
    });
  }

  async addGeolocation(geolocationData: GeolocationDto): Promise<Geolocation> {
    console.log(geolocationData);
    return await this.geolocationRepository.save(geolocationData);
  }

  async updateGeolocation(geolocationData: GeolocationDto, id) {
    const geolocation = await this.findGeolocationBy({ id });
    return this.geolocationRepository.update(geolocation, geolocationData);
  }

  async removeGeolocation(id) {
    const geolocation = await this.findGeolocationBy({ id });
    return this.geolocationRepository.remove(geolocation);
  }
}
