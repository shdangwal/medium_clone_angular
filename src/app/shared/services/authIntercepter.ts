import { HttpInterceptorFn } from "@angular/common/http";
import { PersistanceService } from "./persistance.service";
import { inject } from "@angular/core";

export const authIntercepter: HttpInterceptorFn = (request, next) => {
  const persistanceService = inject(PersistanceService);
  const token = persistanceService.get("accessToken");
  request = request.clone({
    setHeaders: {
      Authorization: `Token ${token}`,
    },
  });

  return next(request);
};
