import { Component } from '@angular/core';
import { LinkService } from '../services/link.service';
import { Link } from '../models/Link';
import { ApiResponse, API_STATUS_CODE } from '../models/ApiResponse';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'link-collection',
  templateUrl: '../templates/linkCollection.component.html',
  styleUrls: ['../stylesheets/linkCollection.component.css'],
  providers: [LinkService],
  animations: [
    trigger('removeRequested', [
      state('requested', style({
        opacity: 1,
        position: 'fixed',
        top: '45%',
        left: '45%',
        boxShadow: 'rgb(136, 136, 136) 0 0 150px, rgb(136, 136, 136) 0 0 150px'
      })),
      state('empty', style({
        opacity: 0,
        position: 'fixed',
        top: '45%',
        left: '45%',
        boxShadow: 'rgb(136, 136, 136) 0 0 150px, rgb(136, 136, 136) 0 0 150px'
      })),
      transition('requested => empty', animate('200ms ease-in')),
      transition('empty => requested', animate('200ms ease-in'))
    ])
  ]
})
export class LinkCollectionComponent {
  links: Array<Link>;
  removeRequest: Link;

  constructor(private linkService: LinkService) {
    this.links = [];
    this.initLinkModel();
    this.getLinks();
  }

  private getLinks()
  {
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
          this.getLinks();
        } else {
          console.error(response.errors)
        }
      });

    this.initLinkModel();
  }

  public switchFavourite(link: Link)
  {
    link.favourite = !link.favourite;

    this.linkService.updateLink(link)
      .subscribe((response: ApiResponse) => {
        if (response.statusCode === API_STATUS_CODE.ERROR) {
          console.error(response.errors)
        }
      });
  }

  public switchStatus(link: Link)
  {
    link.status = (link.status + 1) % 2;

    this.linkService.updateLink(link)
      .subscribe((response: ApiResponse) => {
        if (response.statusCode === API_STATUS_CODE.ERROR) {
          console.error(response.errors)
        }
      });
  }

  public getToRead()
  {
    let arr: Link[] = [];

    for (let link of this.links)
    {
      if (link.status === 0) {
        arr.push(link);
      }
    }

    return arr;
  }

  public getRead()
  {
    let arr: Link[] = [];

    for (let link of this.links)
    {
      if (link.status === 1) {
        arr.push(link);
      }
    }

    return arr;
  }

  public requestRemove(link: Link)
  {
    this.removeRequest = link;
  }

  private onAddLink(link: Link)
  {
    this.getLinks();
  }

  private initLinkModel()
  {
    this.removeRequest = {
      name: "",
      url: "",
      description: "",
      favourite: false
    };
  }
}
