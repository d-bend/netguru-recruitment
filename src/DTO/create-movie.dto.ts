import { IsNotEmpty } from 'class-validator';

export class CreateMovieDTO {
  @IsNotEmpty({ message: 'Movie title is required!' })
  title: string;
}
