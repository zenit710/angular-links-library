import { Component, EventEmitter, Output } from '@angular/core';
import { LinkService } from '../services/link.service';
import { Link } from '../models/Link';
import { ApiResponse, API_STATUS_CODE } from '../models/ApiResponse';

@Component({
  selector: 'link-form',
  templateUrl: '../templates/linkForm.component.html',
  styleUrls: ['../stylesheets/linkForm.component.css'],
  providers: [LinkService]
})
export class LinkComponent {
  @Output() onAdded: EventEmitter<Link> = new EventEmitter<Link>();

  link: Link;

  constructor(private linkService: LinkService) {
    this.initLinkModel();
  }

  public addLink() {
    let link: Link = {
      name: this.link.name,
      url: this.link.url,
      description: this.link.description
    };

    this.linkService.addLink(link)
      .subscribe((response: ApiResponse) => {
        if (response.statusCode === API_STATUS_CODE.OK) {
          this.onAdded.emit(response.result);
        } else {
          console.error(response.errors);
        }
      });

    this.initLinkModel();
  }

  private initLinkModel()
  {
    this.link = {
      name: "",
      url: "",
      description: "",
      favourite: false
    };
  }
}
