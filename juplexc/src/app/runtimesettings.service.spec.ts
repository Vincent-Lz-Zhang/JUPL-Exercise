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
import { AppSettings } from './appSettings';

class mm {
    RuntimeSettings: RuntimeSettings;
}

class ff {
    VigilId: number;
    Uid: string;
    Model: mm;
}

//------ mock the object that server deliver to client when retrieving runtime settings --------//
function makeResponseData(): ff {
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

//------ mock the object that client pushes to server when updating runtime settings --------//
function makeRuntimeSettings(): RuntimeSettings {
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
        CmfPhoneNumber: "+64123456789",
        PalmTouchTrigger: false,
        TouchTriggerCooldownPeriod: 67,
        DemoMode: false,
        DeviceName: 'bumblebee',
        VerboseLogging: true
    }
}

//------ test --------//
describe('RuntimeSettingsService (mockBackend), ', () => {
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

    //------ test GET getRuntimeSettings() --------//
    describe('when calling getRuntimeSettings(), ', () => {
        let backend: MockBackend;
        let service: RuntimeSettingsService;
        let response: Response;

        beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
            backend = be;
            service = new RuntimeSettingsService(http);
            let options = new ResponseOptions({ status: 200, body: makeResponseData() });
            response = new Response(options);
        }));

        it('should have expected fake settings of ReportInterval', async(inject([], () => {
            backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
            service.getRuntimeSettings()
                .then(settings => {
                    expect(settings.ReportInterval).toBe(6080, 'should have expected 6080');
                });
        })));

        it('should have expected fake settings of GeoLocationHighAccuracy', async(inject([], () => {
            backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
            service.getRuntimeSettings()
                .then(settings => {
                    expect(settings.GeoLocationHighAccuracy).toBe(true, 'should have expected true');
                });
        })));

        it('should have expected fake settings of CmfPhoneNumber, PalmTouchTrigger and TouchTriggerCooldownPeriod', async(inject([], () => {
            backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
            service.getRuntimeSettings()
                .then(settings => {
                    expect(
                        "+64123456789" == settings.CmfPhoneNumber
                        && true == settings.PalmTouchTrigger
                        && 30 == settings.TouchTriggerCooldownPeriod
                    ).toBeTruthy('should have expected values');
                });
        })));

        it('should treat 404 as an exception', async(inject([], () => {
            let resp = new Response(new ResponseOptions({ status: 404 }));
            backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
            service.getRuntimeSettings()
                .then(s => {
                    // failure is the expected test result
                    fail('should never reach here');
                })
                .catch(err => {
                    expect(err).toBe("Cannot read property 'Model' of null");  // TODO:  err should be the response object
                });
        })));

        it('should treat 500 as an exception', async(inject([], () => {
            let resp = new Response(new ResponseOptions({ status: 500 }));
            backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
            service.getRuntimeSettings()
                .then(s => {
                    // failure is the expected test result
                    fail('should never reach here');
                })
                .catch(err => {
                    expect(err).toBe("Cannot read property 'Model' of null");
                });

        })));
    });


    //------ test PUT updateRuntimeSettings() --------//
    describe('when calling updateRuntimeSettings(), ', () => {
        let backend: MockBackend;
        let service: RuntimeSettingsService;
        let response: Response;

        beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
            backend = be;
            service = new RuntimeSettingsService(http);
            let options = new ResponseOptions({ status: 204 });
            response = new Response(options);
        }));

        it('should have expected data in the request', async(inject([], () => {
            backend.connections.subscribe(
                (c: MockConnection) => {
                    let body = c.request.json();
                    expect(
                        body.RuntimeSettings.AdherenceCheckInterval == 7
                        && body.RuntimeSettings.AlarmCancelTimeout == 5
                        && body.RuntimeSettings.AlarmClearTimeout == 6
                        && body.RuntimeSettings.CmfPhoneNumber == "+64123456789"
                        && body.RuntimeSettings.DailyReportInterval == 4
                        && body.RuntimeSettings.DemoMode == false
                        && body.RuntimeSettings.DeviceName == "bumblebee"
                        && body.RuntimeSettings.GeoLocationHighAccuracy == true
                        && body.RuntimeSettings.GeoLocationRetryCount == 3
                        && body.RuntimeSettings.GeoLocationTimeOut == 2
                        && body.RuntimeSettings.GeoMaxAgeTimeOut == 1
                        && body.RuntimeSettings.PalmTouchTrigger == false
                        && body.RuntimeSettings.PingInterval == 9
                        && body.RuntimeSettings.PreAlarmPeriod == 8
                        && body.RuntimeSettings.ReportInterval == 10
                        && body.RuntimeSettings.TouchTriggerCooldownPeriod == 67
                        && body.RuntimeSettings.VerboseLogging == true
                    ).toBeTruthy('the data pushed through the PUT api should be....');
                    c.mockRespond(response);
                }
            );
            service.updateRuntimeSettings(makeRuntimeSettings());
        })));

        it('should treat http status 400 as an exception', async(inject([], () => {
            let resp = new Response(
                new ResponseOptions({ status: 400, body: '{"Message": "The request is invalid."}' })    // Can not convert Null to Int32.
            );
            backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
            service.updateRuntimeSettings(makeRuntimeSettings())
                .then(s => {
                    // TODO: failure is the expected test result, the execution should not get here, but it does reach here
                    fail('The promise should be rejected, and the execution should never reach here');

                    //console.log('V: ' + s.json().Message);
                    /*
                    expect(400 == s.status
                        && 'The request is invalid.' == s.json().Message)
                        .toBeTruthy('the status code should be 400');
                    */
                })
                .catch(err => {
                    console.log('Vince: ' + err);
                    expect(err.json().Message).toBe('The request is invalid.'); 
                    // TODO: the execution should get here, but it does not get here
                });
        })));

        it('should treat http status 500 as an exception', async(inject([], () => {
            let resp = new Response(
                new ResponseOptions({ status: 500, body: '{"Message": "Server Internal Error."}' }) 
            );
            backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
            service.updateRuntimeSettings(makeRuntimeSettings())
                .then(s => {
                    // TODO: failure is the expected test result, the execution should not get here, but it does reach here
                    fail('The promise should be rejected, and the execution should never reach here');

                    //console.log('V resolve: ' + s.json().Message);
                    /*
                    expect(500 == s.status
                        && 'Server Internal Error.' == s.json().Message)
                        .toBeTruthy('the status code should be 400');
                    */
                })
                .catch(err => {
                    console.log('V catch: ' + err);
                    expect(err.json().Message).toBe('Server Internal Error.');
                    // TODO: the execution should get here, but it does not get here
                });
        })));



    });



});