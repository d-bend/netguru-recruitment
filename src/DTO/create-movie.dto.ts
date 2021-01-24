import { IsNotEmpty } from 'class-validator';
import { AvailableApiFields } from 'src/movies/types/export';

export class CreateMovieDTO {
  @IsNotEmpty({ message: 'Movie title is required!' })
  title: string;
  relevantFields: Partial<AvailableApiFields>;
}
