import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Link } from "../models/Link";

@Injectable()
export class LinkService
{

  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }

  public getLinks()
  {
    return this.http.get('/api/link')
      .map(response => response.json());
  }

  public addLink(link: Link)
  {
    return this.http.post('/api/link', JSON.stringify(link), { headers: this.headers })
      .map(response => response.json());
  }

  public removeLink(id: string)
  {
    return this.http.delete('/api/link/' + id)
      .map(response => response.json());
  }

  public updateLink(link: Link)
  {
    return this.http.post('/api/link/update', JSON.stringify(link), { headers: this.headers })
      .map(response => response.json());
  }

}
