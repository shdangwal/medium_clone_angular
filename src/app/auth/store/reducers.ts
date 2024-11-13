import { createFeature, createReducer, on } from "@ngrx/store";
import { AuthStateInterface } from "../types/authState.interface";
import { authActions } from "./actions";

const initialState: AuthStateInterface = {
  isSubmit: false,
  isLoading: false,
  currentUser: undefined,
  validationErrors: null,
};

const authFeatures = createFeature({
  name: "auth",
  reducer: createReducer(
    initialState,
    on(authActions.register, (state) => ({
      ...state,
      isSubmit: true,
      validationErrors: null,
    })),
    on(authActions.registerSuccess, (state, action) => ({
      ...state,
      isSubmit: true,
      currentUser: action.currentUser,
    })),
    on(authActions.registerFailure, (state, action) => ({
      ...state,
      isSubmit: true,
      validationErrors: action.errors,
    })),
  ),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsSubmit,
  selectIsLoading,
  selectValidationErrors,
} = authFeatures;
