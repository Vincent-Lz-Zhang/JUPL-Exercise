import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { RuntimeSettings } from './runtimesettings';
import { RUNTIMESETTINGS_M } from './mock-runtimesettings';

@Injectable()
export class RuntimeSettingsService {

    private headers = new Headers({ 'Authorization': 'Bearer RJ56/Rw5vEO2WfAdPih5Lw==' });
    private settingsUrl = 'https://preprod.vbn.care/api2/v2/device/40072?names=RuntimeSettings'; 

    constructor(private http: Http) { }

    getRuntimeSettings(): Promise<RuntimeSettings> {
        //return Promise.resolve(RUNTIMESETTINGS_M);
        return this.http.get(this.settingsUrl, {
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