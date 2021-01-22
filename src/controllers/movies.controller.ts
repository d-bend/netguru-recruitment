import {
  Controller,
  Get,
  NotImplementedException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BasicUserGuard } from '../auth/basic-user.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MoviesService } from '../movies/movies.service';

@Controller('/movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
  @UseGuards(JwtAuthGuard, BasicUserGuard)
  @Get()
  public async getAll() {
    throw new NotImplementedException();
  }

  @UseGuards(JwtAuthGuard, BasicUserGuard)
  @Post()
  public async createMovie() {
    throw new NotImplementedException();
  }
}
