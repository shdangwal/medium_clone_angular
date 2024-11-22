import { Component, OnInit } from "@angular/core";
import { combineLatest } from "rxjs";
import {
  selectError,
  selectIsLoading,
  selectPopularTagsData,
} from "./store/reducers";
import { Store } from "@ngrx/store";
import { popularTagsActions } from "./store/actions";
import { CommonModule } from "@angular/common";
import { ErrorMessageComponent } from "../error/error.component";
import { LoadingComponent } from "../loading/loading.component";
import { RouterLink } from "@angular/router";

@Component({
  selector: "mc-popular-tags",
  templateUrl: "./popularTag.component.html",
  standalone: true,
  imports: [CommonModule, ErrorMessageComponent, LoadingComponent, RouterLink],
})
export class PopularTagsComponent implements OnInit {
  data$ = combineLatest({
    popularTags: this.store.select(selectPopularTagsData),
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
  });
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(popularTagsActions.getPopularTags());
  }
}
