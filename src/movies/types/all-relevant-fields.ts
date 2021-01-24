import { RelevantField } from './relevant-field.type';
/**
 * This is an array that is used for filtering out private/irrelevant fields when revtrieving data from db
 */
export const AllRelevantFields: RelevantField[] = [
  'title',
  'year',
  'rated',
  'released',
  'runtime',
  'genre',
  'director',
  'writer',
  'actors',
  'plot',
  'language',
  'country',
  'awards',
  'poster',
  'ratings',
  'metascore',
  'imdbRating',
  'imdbVotes',
  'type',
  'dVD',
  'boxOffice',
  'production',
  'websiste',
];

/** default filter for case when no filtering options are passed in request. It's like this to comply with the task spec */
export const TaskSpecRelevantFields: RelevantField[] = [
  'title',
  'year',
  'released',
  'genre',
  'director',
];
