import { Actions, createEffect, ofType } from "@ngrx/effects";
import { FeedService } from "../services/feed.service";
import { feedActions } from "./actions";
import { GetFeedResponseInterface } from "../types/getFeedResponse.interface";
import { inject } from "@angular/core";
import { switchMap, map, catchError, of } from "rxjs";

export const getFeedEffect = createEffect(
  (actions$ = inject(Actions), feedService = inject(FeedService)) => {
    return actions$.pipe(
      ofType(feedActions.getFeed),
      switchMap(({ url }) => {
        return feedService.getFeed(url).pipe(
          map((feed: GetFeedResponseInterface) => {
            return feedActions.getFeedSuccess({ feed });
          }),
          catchError(() => {
            return of(feedActions.getFeedFailure());
          }),
        );
      }),
    );
  },
  { functional: true },
);
