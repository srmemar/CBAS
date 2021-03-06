import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { _throw } from 'rxjs/observable/throw';
import { AuthenticationService } from './authentication.service';

@Injectable() export class PISiteService {

    

    constructor(
        private http: HttpClient,
        private authenticationService: AuthenticationService) { }


    public getPISite(): any {

        return this.http
            .get("/api/PISite/GetPISite", {
                //headers: this.authenticationService.getAuthorizationHeader()
                headers: new HttpHeaders().set('Content-Type', 'application/json')
            }).pipe(
            map((response: Response) => {
                return response;
            }),
            catchError((error: any) => {
                return _throw(error);
            }));
    }

    public getPISitebyUserID(): any {

        return this.http
            .get("/api/PISite/GetPISitebyUserID", {
                headers: this.authenticationService.getAuthorizationHeader()
            });
    }



    


}
