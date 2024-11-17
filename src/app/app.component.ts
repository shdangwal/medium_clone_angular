import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { TopBarComponent } from "./shared/components/topbar/topbar.component";
import { Store } from "@ngrx/store";
import { authActions } from "./auth/store/actions";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, TopBarComponent],
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  title = "medium_clone_angular";

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(authActions.getCurrentUser());
  }
}
