/** Compare res.data.Response to OmDBApiNullResponse.false. Truthy if movie was not found in OMDB  */
export enum OmdbApiNullResponse {
  false = 'False',
}

// define the keys of API response from OMDB here
export type OmdbApiField =
  | 'Title'
  | 'Year'
  | 'Rated'
  | 'Released'
  | 'Runtime'
  | 'Genre'
  | 'Director'
  | 'Writer'
  | 'Actors'
  | 'Plot'
  | 'Language'
  | 'Country'
  | 'Awards'
  | 'Poster'
  | 'Ratings'
  | 'Metascore'
  | 'imdbRating'
  | 'imdbVotes'
  | 'Type'
  | 'DVD'
  | 'BoxOffice'
  | 'Production'
  | 'Websiste';
