import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AppSettings } from './appSettings';
import { RuntimeSettings } from './runtimesettings';
import { RUNTIMESETTINGS_M } from './mock-runtimesettings';

@Injectable()
export class RuntimeSettingsService {

    private headers = new Headers({ 'Authorization': AppSettings.AUTHORIZATION_HEADER });

    constructor(private http: Http) { }

    getRuntimeSettings(): Promise<RuntimeSettings> {
        //return Promise.resolve(RUNTIMESETTINGS_M);
        return this.http.get(AppSettings.API_ENDPOINT, {
            headers: this.headers
        })
            .toPromise()
            .then(response => response.json().Model.RuntimeSettings as RuntimeSettings)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}