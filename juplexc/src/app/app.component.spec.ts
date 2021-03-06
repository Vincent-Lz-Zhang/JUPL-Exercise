import { AppComponent } from './app.component';
import { RuntimeSettings } from './runtimesettings';
import { RuntimeSettingsService } from './runtimesettings.service';
import { async, fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {
    ResponseOptions,
    Response,
    Http,
    BaseRequestOptions,
    RequestMethod
} from '@angular/http';

const mockHttpProvider = {
    deps: [MockBackend, BaseRequestOptions],
    useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
        return new Http(backend, defaultOptions);
    }
};

describe('AppComponent', function () {
    let de: DebugElement;
    let comp: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let runtimeSettingsService: RuntimeSettingsService;
    let spy: jasmine.Spy;

    const testSettings: RuntimeSettings = {
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
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent],
            imports: [FormsModule],
            providers: [{ provide: Http, useValue: mockHttpProvider },
                MockBackend,
                BaseRequestOptions,
                RuntimeSettingsService],
        })
            .compileComponents();

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement.query(By.css('h2'));
        runtimeSettingsService = fixture.debugElement.injector.get(RuntimeSettingsService);
        spy = spyOn(runtimeSettingsService, 'getRuntimeSettings')
            .and.returnValue(Promise.resolve(testSettings));
    });

    it('should create component', () => expect(comp).toBeDefined());

    it('should have expected <h2> text', () => {
        fixture.detectChanges();
        const h2 = de.nativeElement;
        expect(h2.innerText).toMatch('Runtime Settings',
            'Expected to be "Runtime Settings" literally');
    });

});
