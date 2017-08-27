import { Component, EventEmitter, Output } from '@angular/core';
import { LinkService } from '../services/link.service';
import { Link } from '../models/Link';
import { ApiResponse, API_STATUS_CODE } from '../models/ApiResponse';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'link-form',
  templateUrl: '../templates/linkForm.component.html',
  styleUrls: ['../stylesheets/linkForm.component.css'],
  providers: [LinkService],
  animations: [
    trigger('hasErrors', [
      state('errors', style({
        opacity: 1,
        height: '*'
      })),
      state('no-errors', style({
        opacity: 0,
        height: '0px'
      })),
      transition('errors => no-errors', animate('200ms ease-in')),
      transition('no-errors => errors', animate('200ms ease-out'))
    ])
  ]
})
export class LinkComponent {
  @Output() onAdded: EventEmitter<Link> = new EventEmitter<Link>();

  link: Link;
  errors: Array<any> = [];

  constructor(private linkService: LinkService) {
    this.initLinkModel();
  }

  public addLink() {
    let link: Link = {
      name: this.link.name,
      url: this.link.url,
      description: this.link.description,
      favourite: this.link.favourite
    };

    this.linkService.addLink(link)
      .subscribe((response: ApiResponse) => {
        if (response.statusCode === API_STATUS_CODE.OK) {
          this.onAdded.emit(response.result);
          this.initLinkModel();
        } else {
          let obj: Object = response.errors.errors;
          this.errors = Object.keys(obj).map(key => obj[key]);
        }
      });
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

  public clearErrors()
  {
    this.errors = [];
  }
}
