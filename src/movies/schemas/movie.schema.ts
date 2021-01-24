import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { MovieRating } from '../types/movie-info.interface';

export type MovieDocument = Movie & Document;

@Schema()
export class Movie {
  @Prop({ index: true })
  owner: number;

  @Prop({ required: true })
  title: string;

  @Prop()
  year: number;

  @Prop()
  rated: string;

  @Prop({ type: Date })
  released: Date;

  @Prop()
  runtime: string;

  @Prop()
  genre: string;

  @Prop()
  director: string;

  @Prop()
  writer: string;

  @Prop()
  actors: string;

  @Prop()
  plot: string;

  @Prop()
  language: string;

  @Prop()
  country: string;

  @Prop()
  awards: string;

  @Prop()
  poster: string;

  @Prop({ type: Types.Array })
  ratings: MovieRating[];

  @Prop()
  metascore: number;

  @Prop()
  imdbRating: number;

  @Prop()
  imdbVotes: number;

  @Prop()
  type: string;

  @Prop()
  dVD: string;

  @Prop()
  boxOffice: string;

  @Prop()
  production: string;

  @Prop()
  websiste: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
