import { Injectable } from '@nestjs/common';
import { lowerFirst } from 'lodash';

@Injectable()
export class UtilsService {
  /**
   * This is a very generic method that makes it possible for the user to specify which information about a movie is relevant to him and filter out irrelevant info!
 * @type T = union type of keys that will be used for filtering
 * @type S = return type for resolving type conflicts
 *  
 * @param unfiltered object that needs to be filtered for relevant fields 
 * @param relevantFields array of type RelevantField[] that contains keys that you want to extract from response
 * @returns object that only contains fields that interest you, returned keys always start with lowercase
 * 
 * @example 
 * filterKeys<OmdbApiField>(
      apiResponse,
      OmdbRelevantFields: OmdbApiField[],
    ): any
    @example
    filterRelevantKeys<RelevantField, MovieInfo>(
      saved: MongooseSaveResult,
      relevantFields: RelevatField[],
    ): MovieInfo;

 */
  public filterRelevantKeys<T extends string = string, S = unknown>(
    unfiltered: any,
    relevantFields: T[],
  ): S {
    return Object.keys(unfiltered)
      .filter((key: T) => relevantFields.includes(key))
      .reduce((obj, key) => {
        obj[lowerFirst(key)] = unfiltered[key];
        return obj;
      }, {}) as S;
  }
}
