import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideState, provideStore } from "@ngrx/store";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { authFeatureKey, authReducer } from "./auth/store/reducers";
import { provideEffects } from "@ngrx/effects";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import * as authEffects from "./auth/store/effects";
import { provideRouterStore, routerReducer } from "@ngrx/router-store";
import { authIntercepter } from "./shared/services/authIntercepter";

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authIntercepter])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideState(authFeatureKey, authReducer),
    provideStore({
      router: routerReducer,
    }),
    provideRouterStore(),
    provideEffects(authEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ],
};
