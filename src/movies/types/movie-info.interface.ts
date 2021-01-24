export interface MovieInfo {
  title: string;
  year: number;
  rated: string;
  released: Date;
  runtime: string;
  genre: string;
  director: string;
  writer: string;
  actors: string;
  plot: string;
  language: string;
  country: string;
  awards: string;
  poster: string;
  ratings: MovieRating[];
  metascore: number;
  imdbRating: number;
  imdbVotes: number;
  type: string;
  //has to be this way because of how one util function wokrs
  dVD: string;
  boxOffice: string;
  production: string;
  websiste: string;
}
export interface MovieRating {
  source: string;
  value: string;
}
