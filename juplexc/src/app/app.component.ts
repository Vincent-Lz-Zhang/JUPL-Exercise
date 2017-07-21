import { Component, Input } from '@angular/core';
import { RuntimeSettings } from './runtimesettings';
import { RuntimeSettingsService } from './runtimesettings.service';
import { OnInit } from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    providers: [RuntimeSettingsService]
})
export class AppComponent implements OnInit {

    //@Input()
    //runtimeSettings: RuntimeSettings;
    //data: Promise<RuntimeSettings>;
    reportInterval: number;
    pingInterval: number;
    preAlarmPeriod: number;
    adherenceCheckInterval: number;
    alarmClearTimeout: number;
    alarmCancelTimeout: number;
    dailyReportInterval: number;
    geoLocationRetryCount: number;
    geoLocationHighAccuracy: boolean;
    geoLocationTimeOut: number;
    geoMaxAgeTimeOut: number;
    cmfPhoneNumber: string;
    palmTouchTrigger: boolean;
    touchTriggerCooldownPeriod: number;
    demoMode: boolean;
    deviceName: string;
    verboseLogging: boolean;

    constructor(private runtimeSettingsService: RuntimeSettingsService) { }

    getRuntimeSettings(): void {
        //this.data = this.runtimeSettingsService.getRuntimeSettings();
        /*
        this.runtimeSettingsService.getRuntimeSettings().then(
            settings => this.runtimeSettings = settings
        );
        */
        this.runtimeSettingsService.getRuntimeSettings().then(
            //settings => Object.assign(this, settings)
            // TODO: might use destructuring
            settings => {
                this.reportInterval = settings.ReportInterval;
                this.pingInterval = settings.PingInterval;
                this.preAlarmPeriod = settings.PreAlarmPeriod;
                this.adherenceCheckInterval = settings.AdherenceCheckInterval;
                this.alarmClearTimeout = settings.AlarmClearTimeout;
                this.alarmCancelTimeout = settings.AlarmCancelTimeout;
                this.dailyReportInterval = settings.DailyReportInterval;
                this.geoLocationRetryCount = settings.GeoLocationRetryCount;
                this.geoLocationHighAccuracy = settings.GeoLocationHighAccuracy;
                this.geoLocationTimeOut = settings.GeoLocationTimeOut;
                this.geoMaxAgeTimeOut = settings.GeoMaxAgeTimeOut;
                this.cmfPhoneNumber = settings.CmfPhoneNumber;
                this.palmTouchTrigger = settings.PalmTouchTrigger;
                this.touchTriggerCooldownPeriod = settings.TouchTriggerCooldownPeriod;
                this.demoMode = settings.DemoMode;
                this.deviceName = settings.DeviceName;
                this.verboseLogging = settings.VerboseLogging;
            }
        )
            .catch(function (reason) {
                console.error('Oops¬ ', reason); 
                // TODO: visual prompt to user
            });
        
    }

    ngOnInit(): void {
        this.getRuntimeSettings();
    }

    save(): void {
        this.updateRuntimeSettings();
    }


    updateRuntimeSettings(): void {
        //console.log('here: ' + this.deviceName);
        let settings: RuntimeSettings = {
            ReportInterval: Number(this.reportInterval),
            PingInterval: this.pingInterval,
            PreAlarmPeriod: this.preAlarmPeriod,
            AdherenceCheckInterval: this.adherenceCheckInterval,
            AlarmClearTimeout: this.alarmClearTimeout,
            AlarmCancelTimeout: this.alarmCancelTimeout,
            DailyReportInterval: this.dailyReportInterval,
            GeoLocationRetryCount: this.geoLocationRetryCount,
            GeoLocationHighAccuracy: this.geoLocationHighAccuracy,
            GeoLocationTimeOut: this.geoLocationTimeOut,
            GeoMaxAgeTimeOut: this.geoMaxAgeTimeOut,
            CmfPhoneNumber: this.cmfPhoneNumber,
            PalmTouchTrigger: this.palmTouchTrigger,
            TouchTriggerCooldownPeriod: this.touchTriggerCooldownPeriod,
            DemoMode: this.demoMode,
            DeviceName: this.deviceName,
            VerboseLogging: this.verboseLogging
        };
        this.runtimeSettingsService.updateRuntimeSettings(settings).then(
            function () {
                console.log('returned to component method');
            })
            .catch(function (reason) {
            console.error('Oops¬ ', reason);
            // TODO: visual prompt to user
        });

    }


}
