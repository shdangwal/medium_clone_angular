import { Component, Input } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectCurrentUser } from "../../../auth/store/reducers";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AsyncPipe, NgIf } from "@angular/common";

@Component({
  selector: "mc-feed-toggler",
  templateUrl: "./feedToggler.component.html",
  standalone: true,
  imports: [RouterLink, NgIf, AsyncPipe, RouterLinkActive],
})
export class FeedTogglerComponent {
  @Input() tagName?: string;

  currentUser$ = this.store.select(selectCurrentUser);

  constructor(private store: Store) {}
}
