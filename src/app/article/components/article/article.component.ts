import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Store } from "@ngrx/store";
import { AsyncPipe, NgIf } from "@angular/common";
import { combineLatest, filter, map } from "rxjs";
import { selectCurrentUser } from "../../../auth/store/reducers";
import { ErrorMessageComponent } from "../../../shared/components/error/error.component";
import { LoadingComponent } from "../../../shared/components/loading/loading.component";
import { TagListComponent } from "../../../shared/components/tagList/tagList.component";
import { articleActions } from "../../store/actions";
import {
  selectArticleData,
  selectIsLoading,
  selectError,
} from "../../store/reducers";

@Component({
  selector: "mc-article",
  templateUrl: "./article.component.html",
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    RouterLink,
    ErrorMessageComponent,
    LoadingComponent,
    TagListComponent,
  ],
})
export class ArticleComponent implements OnInit {
  slug = this.route.snapshot.paramMap.get("slug") ?? "";
  isAuthor$ = combineLatest({
    article: this.store.select(selectArticleData),
    currentUser: this.store
      .select(selectCurrentUser)
      .pipe(filter((currentUser) => currentUser !== undefined)),
  }).pipe(
    map(({ article, currentUser }) => {
      if (!article || !currentUser) {
        return false;
      }
      return article.author.username === currentUser.username;
    }),
  );
  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    article: this.store.select(selectArticleData),
    error: this.store.select(selectError),
    isAuthor: this.isAuthor$,
  });

  constructor(
    private store: Store,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(articleActions.getArticle({ slug: this.slug }));
  }

  deleteArticle(): void {
    this.store.dispatch(articleActions.deleteArticle({ slug: this.slug }));
  }
}
