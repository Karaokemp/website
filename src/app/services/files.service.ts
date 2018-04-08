import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class FilesService {

  sendYoutubeLink(link: string): any {
    console.log('files service sending link: ' + link);
    return this.http
    .get('http://localhost:8080/youtube',
      {
        params: new HttpParams().set('link', link),
        headers: new HttpHeaders()
          .set('Accept', 'application/json')      })
    
    
  }
  constructor(private http:HttpClient) { 
  }

}
