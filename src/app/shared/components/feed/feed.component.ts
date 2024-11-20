import { Component, Input, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { feedActions } from "./store/actions";
import { selectError, selectFeedData, selectIsLoading } from "./store/reducers";
import { combineLatest } from "rxjs";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Params, Router, RouterLink } from "@angular/router";
import { ErrorMessageComponent } from "../error/error.component";
import { LoadingComponent } from "../loading/loading.component";
import { environment } from "../../../../environments/environment.development";
import { PaginationComponent } from "../backendErrorMessages/pagination/pagination.component";
import queryString from "query-string";

@Component({
  selector: "mc-feed",
  templateUrl: "./feed.component.html",
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ErrorMessageComponent,
    LoadingComponent,
    PaginationComponent,
  ],
})
export class FeedComponent implements OnInit {
  @Input() apiUrl: string = "";
  limit = environment.limit;
  baseUrl = this.router.url.split("?")[0];
  currentPage: number = 0;

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    feed: this.store.select(selectFeedData),
  });

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.currentPage = Number(params["page"] || 1);
      this.fetchFeed();
    });
  }

  fetchFeed(): void {
    const offset = this.currentPage * this.limit - this.limit;
    const parsedUrl = queryString.parseUrl(this.apiUrl);
    const stringifiedParams = queryString.stringify({
      limit: this.limit,
      offset,
      ...parsedUrl.query,
    });
    const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
    this.store.dispatch(feedActions.getFeed({ url: apiUrlWithParams }));
  }
}
