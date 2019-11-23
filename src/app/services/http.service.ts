import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public HOSTNAME = 'https://api.beyondtabletop.com'
  public ROOT_PATH = 'api/mobile/v1'

  constructor(
    private http: HttpClient,
  ) { }

  public getUrlAsPromise (url: string, options: any = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.HOSTNAME}/${this.ROOT_PATH}/${url}`, options).pipe(take(1)).subscribe((data: any) => resolve(data), reject)
    })
  }

  public postUrl (url: string, params: any, options: any = {}): Observable<any> {
    return this.http.post(`${this.HOSTNAME}/${this.ROOT_PATH}/${url}`, params, options)
  }

  public getLocalAsPromise (url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(url).pipe(take(1)).subscribe((data: any) => resolve(data), reject)
    })
  }
}
