import {
    async, inject, TestBed
} from '@angular/core/testing';

import {
    MockBackend,
    MockConnection
} from '@angular/http/testing';

import {
    HttpModule, Http, XHRBackend, Response, ResponseOptions
} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import { RuntimeSettings } from './runtimesettings';
import { RuntimeSettingsService } from './runtimesettings.service';


class mm {
    RuntimeSettings: RuntimeSettings;
}

class ff {
    VigilId: number;
    Uid: string;
    Model: mm;
}

function makeRuntimeSettings(): ff {
    /*
    return {
        ReportInterval: 10,
        PingInterval: 9,
        PreAlarmPeriod: 8,
        AdherenceCheckInterval: 7,
        AlarmClearTimeout: 6,
        AlarmCancelTimeout: 5,
        DailyReportInterval: 4,
        GeoLocationRetryCount: 3,
        GeoLocationHighAccuracy: true,
        GeoLocationTimeOut: 2,
        GeoMaxAgeTimeOut: 1,
        CmfPhoneNumber: 'gf',
        PalmTouchTrigger: false,
        TouchTriggerCooldownPeriod: 67,
        DemoMode: false,
        DeviceName: 'rf',
        VerboseLogging: true
    }
    */
    return {
        VigilId: 40072,
        Uid: "R3AJ1001EMH",
        Model: {
            RuntimeSettings: {
                ReportInterval: 6080,
                PingInterval: 1050,
                PreAlarmPeriod: 10,
                AdherenceCheckInterval: 400,
                AlarmClearTimeout: 900,
                AlarmCancelTimeout: 15,
                DailyReportInterval: 12000,
                GeoLocationRetryCount: 5,
                GeoLocationHighAccuracy: true,
                GeoLocationTimeOut: 500,
                GeoMaxAgeTimeOut: 60,
                CmfPhoneNumber: "+64123456789",
                PalmTouchTrigger: true,
                TouchTriggerCooldownPeriod: 30,
                DemoMode: false,
                DeviceName: "Mark XII",
                VerboseLogging: true
            }
        }
    }

}

describe('RuntimeSettingsService (mockBackend)', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                RuntimeSettingsService,
                { provide: XHRBackend, useClass: MockBackend }
            ]
        })
            .compileComponents();
    }));

    it('can instantiate service when inject service',
        inject([RuntimeSettingsService], (service: RuntimeSettingsService) => {
            expect(service instanceof RuntimeSettingsService).toBe(true);
        }));

    it('can instantiate service with "new"', inject([Http], (http: Http) => {
        expect(http).not.toBeNull('http should be provided');
        let service = new RuntimeSettingsService(http);
        expect(service instanceof RuntimeSettingsService).toBe(true, 'new service should be ok');
    }));

    it('can provide the mockBackend as XHRBackend',
        inject([XHRBackend], (backend: MockBackend) => {
            expect(backend).not.toBeNull('backend should be provided');
        }));


    describe('when getHeroes', () => {
        let backend: MockBackend;
        let service: RuntimeSettingsService;
        let settings_be: string;
        let response: Response;

        beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
            backend = be;
            service = new RuntimeSettingsService(http);
            settings_be = JSON.stringify(makeRuntimeSettings());
            let options = new ResponseOptions({ status: 200, body: { data: settings_be } });
            response = new Response(options);
        }));

    });

});