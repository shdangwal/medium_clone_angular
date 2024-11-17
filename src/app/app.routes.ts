import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "register",
    loadChildren: (): Promise<Routes> =>
      import("./auth/auth.routes").then((m) => m.authRoutes),
  },
  {
    path: "login",
    loadChildren: (): Promise<Routes> =>
      import("./auth/auth.routes").then((m) => m.loginRoutes),
  },
];
