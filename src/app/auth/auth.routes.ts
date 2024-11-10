import { Route } from "@angular/router";
import { RegisterComponent } from "./components/register/register.component";

export const authRoutes: Route[] = [
  {
    path: "",
    component: RegisterComponent,
  },
];
