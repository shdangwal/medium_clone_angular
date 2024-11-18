import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GetFeedResponseInterface } from "../types/getFeedResponse.interface";
import { environment } from "../../../../../environments/environment.development";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FeedService {
  constructor(private http: HttpClient) {}

  getFeed(url: string): Observable<GetFeedResponseInterface> {
    const fullUrl = environment.apiUrl + url;
    return this.http.get<GetFeedResponseInterface>(fullUrl);
  }
}
