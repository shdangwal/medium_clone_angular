import { Actions, createEffect, ofType } from "@ngrx/effects";
import { authActions } from "./actions";
import { catchError, map, of, switchMap } from "rxjs";
import { CurrentUserInterface } from "../../shared/types/currentUser.interface";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";

export class RegisterEffects {
  registerEffect$ = createEffect(
    (actions$ = inject(Actions), authService = inject(AuthService)) => {
      return actions$.pipe(
        ofType(authActions.register),
        switchMap(({ request }) => {
          return authService.register(request).pipe(
            map((currentUser: CurrentUserInterface) => {
              return authActions.registerSuccess({ currentUser });
            }),
            catchError(() => {
              return of(authActions.registerFailure);
            }),
          );
        }),
      );
    },
  );
}
