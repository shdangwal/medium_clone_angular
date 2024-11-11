import { createAction, props } from "@ngrx/store";
import { RegisterRequestInterface } from "../types/register.interface";

export const register = createAction(
  "[Auth] Register",
  props<{ request: RegisterRequestInterface }>(),
);
