export interface AvailableApiFields {
  year: boolean;
  rated: boolean;
  released: boolean;
  runtime: boolean;
  genre: boolean;
  director: boolean;
  writer: boolean;
  actors: boolean;
  plot: boolean;
  language: boolean;
  country: boolean;
  awards: boolean;
  poster: boolean;
  ratings: boolean;
  metascore: boolean;
  imdbRating: boolean;
  imdbVotes: boolean;
  type: boolean;
  //next param has to be this way because of how one of util functions work
  //the fix for that should be easy but for now i'm leaving it as it is.
  dVD: boolean;
  boxOffice: boolean;
  production: boolean;
  websiste: boolean;
}
