export enum OmdbApiNullResponse {
  false = 'False',
}

// define the keys of API response from OMDB here
export type OmdbApiField = 'Title' | 'Released' | 'Director' | 'Genre';

// supply the response fields that you want to extract
export const OmdbRelevantFields: OmdbApiField[] = [
  'Title',
  'Released',
  'Director',
  'Genre',
];
