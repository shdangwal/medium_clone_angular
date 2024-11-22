import { Actions, createEffect, ofType } from "@ngrx/effects";
import { inject } from "@angular/core";
import { switchMap, map, catchError, of } from "rxjs";
import { PopularTagService } from "../../../services/popularTag.service";
import { popularTagsActions } from "./actions";
import { PopularTagType } from "../../../types/popularTag.type";

export const getPopularTagsEffect = createEffect(
  (
    actions$ = inject(Actions),
    popularTagsService = inject(PopularTagService),
  ) => {
    return actions$.pipe(
      ofType(popularTagsActions.getPopularTags),
      switchMap(() => {
        return popularTagsService.getPopularTags().pipe(
          map((popularTags: PopularTagType[]) => {
            return popularTagsActions.getPopularTagsSuccess({ popularTags });
          }),
          catchError(() => {
            return of(popularTagsActions.getPopularTagsFailure);
          }),
        );
      }),
    );
  },
  { functional: true },
);
