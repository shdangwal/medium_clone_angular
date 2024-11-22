import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PopularTagType } from "../types/popularTag.type";
import { environment } from "../../../environments/environment.development";
import { map, Observable } from "rxjs";
import { GetPopularTagsResponseInterface } from "../components/popularTags/types/getPopularTagsResponse.interface";

@Injectable({
  providedIn: "root",
})
export class PopularTagService {
  constructor(private http: HttpClient) {}

  getPopularTags(): Observable<PopularTagType[]> {
    const url = environment.apiUrl + "/tags";
    return this.http
      .get<GetPopularTagsResponseInterface>(url)
      .pipe(map((response) => response.tags));
  }
}
