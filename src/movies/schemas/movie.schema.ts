import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MovieDocument = Movie & Document;

@Schema()
export class Movie {
  @Prop({ index: true })
  owner: Types.ObjectId;

  @Prop()
  title: string;

  @Prop()
  released: Date;

  @Prop()
  genre: string;

  @Prop()
  director: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
