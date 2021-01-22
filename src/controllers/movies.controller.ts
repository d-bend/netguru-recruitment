import { Controller, Get, Post } from '@nestjs/common';
import { MoviesService } from 'src/movies/movies.service';

@Controller('/movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  public async getAll() {}

  @Post()
  public async createMovie() {}
}
