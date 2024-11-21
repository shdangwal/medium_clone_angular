import { Component, Input } from "@angular/core";
import { PopularTagType } from "../../types/popularTag.type";
import { NgFor } from "@angular/common";

@Component({
  selector: "mc-tag-list",
  templateUrl: "./tagList.component.html",
  standalone: true,
  imports: [NgFor],
})
export class TagListComponent {
  @Input() tags: PopularTagType[] = [];
}
