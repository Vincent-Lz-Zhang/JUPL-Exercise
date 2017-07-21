import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AppSettings } from './appSettings';
import { RuntimeSettings } from './runtimesettings';
import { RUNTIMESETTINGS_M } from './mock-runtimesettings';

@Injectable()
export class RuntimeSettingsService {

    private headers: Headers = new Headers({ 'Authorization': AppSettings.AUTHORIZATION_HEADER });
    private headers_put: Headers  = new Headers({ 'Authorization': AppSettings.AUTHORIZATION_HEADER });
    
    constructor(private http: Http) {
        this.headers_put.append('Content-Type', 'application/json');
    }

    getRuntimeSettings(): Promise<RuntimeSettings> {
        //return Promise.resolve(RUNTIMESETTINGS_M);
        return this.http.get(AppSettings.API_ENDPOINT, {
            headers: this.headers
        })
            .toPromise()
            .then(response => response.json().Model.RuntimeSettings as RuntimeSettings)
            .catch(this.handleError);
    }

    updateRuntimeSettings(settings: RuntimeSettings): Promise<RuntimeSettings> {
        let data: any = {
            RuntimeSettings: settings
        };
        return this.http
            .put(AppSettings.API_ENDPOINT, JSON.stringify(data), { headers: this.headers_put })
            .toPromise()
            .then(this.getRuntimeSettings.bind(this)

/*
            function () {
                //console.log('the put has returned.');
                return this.getRuntimeSettings();
            }
                */

            )
            .catch(this.handleError);   // TODO: may handle twice
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);  
        return Promise.reject(error.message || error);
    }
}