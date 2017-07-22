import { Component, Input } from '@angular/core';
import { RuntimeSettings } from './runtimesettings';
import { RuntimeSettingsService } from './runtimesettings.service';
import { OnInit } from '@angular/core';
import { AppSettings } from './appSettings';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    providers: [RuntimeSettingsService]
})
export class AppComponent implements OnInit {
    
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

    // control the visibility of loading animation
    isLoading: boolean = false;
    updated: boolean = false;
    promptText: string = '';
    colorName: string = '';

    constructor(private runtimeSettingsService: RuntimeSettingsService) { }

    getRuntimeSettings(): Promise<any> {
        // displays the loading animation
        this.isLoading = true;
        return this.runtimeSettingsService.getRuntimeSettings().then(
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
                // hide the loading animation
                this.isLoading = false;
            })
            .catch(reason => {
                console.error('Oops¬ ', reason); 
                this.isLoading = false;
                // TODO: visual prompt to user
            });
        
    }

    ngOnInit(): void {
        this.getRuntimeSettings();
    }

    save(): void {
        this.updateRuntimeSettings();
    }

    formChanged(): void {
        this.updated = false;
    }

    updateRuntimeSettings(): void {
        //console.log('here: ' + this.deviceName);
        let settings: RuntimeSettings = {
            ReportInterval: Number(this.reportInterval),
            PingInterval: Number(this.pingInterval),
            PreAlarmPeriod: Number(this.preAlarmPeriod),
            AdherenceCheckInterval: Number(this.adherenceCheckInterval),
            AlarmClearTimeout: Number(this.alarmClearTimeout),
            AlarmCancelTimeout: Number(this.alarmCancelTimeout),
            DailyReportInterval: Number(this.dailyReportInterval),
            GeoLocationRetryCount: Number(this.geoLocationRetryCount),
            GeoLocationHighAccuracy: Boolean(this.geoLocationHighAccuracy),
            GeoLocationTimeOut: Number(this.geoLocationTimeOut),
            GeoMaxAgeTimeOut: Number(this.geoMaxAgeTimeOut),
            CmfPhoneNumber: this.cmfPhoneNumber,
            PalmTouchTrigger: Boolean(this.palmTouchTrigger),
            TouchTriggerCooldownPeriod: Number(this.touchTriggerCooldownPeriod),
            DemoMode: Boolean(this.demoMode),
            DeviceName: this.deviceName,
            VerboseLogging: Boolean(this.verboseLogging)
        };
        // displays the loading animation
        this.isLoading = true;
        // 
        this.runtimeSettingsService.updateRuntimeSettings(settings).then(
            () => {
                console.log('returned to component method');
                this.updated = true;
                this.colorName = AppSettings.PROMPT_COLOR_NORMAL;
                this.promptText = AppSettings.PROMPT_UPDATE_SUCCESS;
                return this.getRuntimeSettings();
            })
            .catch(response => {
                if (response && response.status) {
                    if (400 == response.status) {
                        console.log('400: ', response.json().Message); // log the real error info
                        this.updated = true;
                        this.colorName = AppSettings.PROMPT_COLOR_DANGER;
                        this.promptText = AppSettings.PROMPT_UPDATE_FAILURE_1;
                    }
                    else if (500 == response.status) {
                        this.updated = true;
                        this.colorName = AppSettings.PROMPT_COLOR_DANGER;
                        this.promptText = AppSettings.PROMPT_UPDATE_FAILURE_2;
                    }
                }
                this.isLoading = false;
        });

    }


}
