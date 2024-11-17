import { createFeature, createReducer, on } from "@ngrx/store";
import { AuthStateInterface } from "../types/authState.interface";
import { authActions } from "./actions";
import { routerNavigatedAction, routerReducer } from "@ngrx/router-store";

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
      isSubmit: false,
      currentUser: action.currentUser,
    })),
    on(authActions.registerFailure, (state, action) => ({
      ...state,
      isSubmit: false,
      validationErrors: action.errors,
    })),

    on(authActions.login, (state) => ({
      ...state,
      isSubmit: true,
      validationErrors: null,
    })),
    on(authActions.loginSuccess, (state, action) => ({
      ...state,
      isSubmit: false,
      currentUser: action.currentUser,
    })),
    on(authActions.loginFailure, (state, action) => ({
      ...state,
      isSubmit: false,
      validationErrors: action.errors,
    })),

    on(authActions.getCurrentUser, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(authActions.getCurrentUserSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      currentUser: action.currentUser,
    })),
    on(authActions.getCurrentUserFailure, (state) => ({
      ...state,
      isLoading: false,
      currentUser: null,
    })),

    on(routerNavigatedAction, (state) => ({
      ...state,
      validationErrors: null,
    })),
  ),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsSubmit,
  selectIsLoading,
  selectCurrentUser,
  selectValidationErrors,
} = authFeatures;
