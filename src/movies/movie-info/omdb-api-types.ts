/** Compare res.data.Response to OmDBApiNullResponse.false. Truthy if movie was not found in OMDB  */
export enum OmdbApiNullResponse {
  false = 'False',
}

// define the keys of API response from OMDB here
export type OmdbApiField = 'Title' | 'Released' | 'Director' | 'Genre';

/**
 * This app will exctract ONLY the fields listed below from OMDB Api response.
 * Feel free to add or remove fields that you want to see in this app,
 * Everything else will be handled for you!
 */
export const OmdbRelevantFields: OmdbApiField[] = [
  'Title',
  'Released',
  'Director',
  'Genre',
];
