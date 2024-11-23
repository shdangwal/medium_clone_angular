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
  {
    path: "",
    loadChildren: (): Promise<Routes> =>
      import("./globalFeed/globalFeed.routes").then((m) => m.globalFeedRoutes),
  },
  {
    path: "feed",
    loadChildren: (): Promise<Routes> =>
      import("./yourFeed/yourFeed.routes").then((m) => m.yourFeedRoutes),
  },
  {
    path: "tags/:slug",
    loadChildren: (): Promise<Routes> =>
      import("./tagFeed/tagFeed.routes").then((m) => m.tagFeedRoutes),
  },
];
