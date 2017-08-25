import { Component } from '@angular/core';
import { LinkService } from '../services/link.service';
import { Link } from '../models/Link';
import { ApiResponse, API_STATUS_CODE } from '../models/ApiResponse';

@Component({
  selector: 'link-collection',
  templateUrl: '../templates/linkCollection.component.html',
  styleUrls: ['../stylesheets/linkCollection.component.css'],
  providers: [LinkService]
})
export class LinkCollectionComponent {
  links: Array<Link>;

  constructor(private linkService: LinkService) {
    this.linkService.getLinks()
      .subscribe((response: ApiResponse) => {
        if (response.statusCode === API_STATUS_CODE.OK) {
          this.links = response.result;
        } else {
          console.error(response.errors);
        }
      });
  }

  public removeLink(id: string)
  {
    this.linkService.removeLink(id)
      .subscribe((response: ApiResponse) => {
        if (response.statusCode === API_STATUS_CODE.OK) {
          this.removeFromArray(id);
        } else {
          console.error(response.errors)
        }
      });
  }

  private removeFromArray(id: string)
  {
    for (let i: number = 0; i < this.links.length; i++) {
      if (this.links[i]._id == id) {
        this.links.splice(i, 1);

        return;
      }
    }
  }

  private onAddLink(link: Link)
  {
    this.links.push(link);
  }
}
