import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { PaginatedResult } from '../data-access';

/**
 * consistent API Response.
 *
 * Cases:
 * 1) Empty response -> returns an empty data array
 * 2) PaginatedResult response -> returns data with pagination metadata
 * 3) Any other response -> wraps payload in `{ data }`
 *
 * @example
 * // Case 1: Empty response
 * // input: null
 * // output: { data: [] }
 *
 * @example
 * // Case 2: PaginatedResult response
 * // input: PaginatedResult<User>
 * // output:
 * // {
 * //   data: [...],
 * //   meta: { totalCount: 100, page: 1, limit: 10, pageCount: 10 }
 * // }
 *
 * @example
 * // Case 3: Regular response
 * // input: { id: 1, name: 'Booking A' }
 * // output: { data: { id: 1, name: 'Booking A' } }
 */
@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response: unknown) => {
        // Case 1: Empty response
        if (!response) return { data: [] };

        // Case 2: PaginatedResult response
        if (response instanceof PaginatedResult)
          return {
            data: response.data,
            meta: {
              totalCount: response.totalCount,
              page: response.page,
              limit: response.limit,
              pageCount: response.pageCount,
            },
          };

        // Case 3: Regular response
        return { data: response };
      }),
    );
  }
}
