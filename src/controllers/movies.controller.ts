import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';

import { User } from '../auth/types/user.interface';

import { BasicUserGuard } from '../auth/basic-user.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { RedisCacheService } from '../auth/redis-cache/redis-cache.service';
import { MoviesService } from '../movies/movies.service';
import { CreateMovieDTO } from '../DTO/create-movie.dto';

@Controller('/movies')
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly redisCache: RedisCacheService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  public async getAll(@Body('user') { userId }: User) {
    return await this.moviesService.getMoviesByUser(userId);
  }

  @UseGuards(JwtAuthGuard, BasicUserGuard)
  @Post()
  public async createMovie(
    @Body('user') { userId }: User,
    @Body() { title }: CreateMovieDTO,
  ) {
    return await this.moviesService.createMovie(userId, title);
  }

  @Delete()
  public async clearCache() {
    await this.redisCache.reset();
    return 'Cache cleared!';
  }
}
