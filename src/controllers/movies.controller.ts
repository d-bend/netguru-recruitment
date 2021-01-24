import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { User } from '../auth/types/user.interface';

import { BasicUserGuard } from '../auth/basic-user.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { RedisCacheService } from '../auth/redis-cache/redis-cache.service';
import { MoviesService } from '../movies/movies.service';
import { CreateMovieDTO } from '../DTO/create-movie.dto';

@Controller('/movies')
export class MoviesController {
  private readonly logger = new Logger(MoviesController.name, true);

  constructor(
    private readonly moviesService: MoviesService,
    private readonly redisCache: RedisCacheService,
  ) {}

  /**
   * This route gets userId from JWT token payload
   *
   */
  @UseGuards(JwtAuthGuard)
  @Get()
  public async getAll(@Req() req) {
    const { userId }: User = req.user;
    this.logger.debug(`user: ${JSON.stringify(req.user)}`, this.getAll.name);
    return await this.moviesService.getMoviesByUser(userId);
  }

  /**
   * This route gets userId from JWT token payload,
   *
   */
  @UseGuards(JwtAuthGuard, BasicUserGuard)
  @Post()
  public async createMovie(@Req() req, @Body() { title }: CreateMovieDTO) {
    const { userId }: User = req.user;
    this.logger.debug(`user: ${JSON.stringify(req.user)}, title: ${title}`);

    return await this.moviesService.createMovie(userId, title);
  }

  /**
   * This route is created only for showcasing caching fucntionality, it should never be present on production!
   * TODO remove this route before pushing to prod.
   */
  @Delete()
  public async clearCache() {
    await this.redisCache.reset();
    return 'Cache cleared!';
  }
}
