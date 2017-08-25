import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LinkService
{

  constructor(private http: Http) {}

  public getLinks()
  {
    return this.http.get('/api/link')
      .map(response => response.json());
  }

  public addLink(link)
  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('/api/link', JSON.stringify(link), { headers: headers })
      .map(response => response.json());
  }

  public removeLink(id: string)
  {
    return this.http.delete('/api/link/' + id)
      .map(response => response.json());
  }

}
