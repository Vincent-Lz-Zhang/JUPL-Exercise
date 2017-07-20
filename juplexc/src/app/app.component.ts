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
    //reportInterval: number;
    //pingInterval: number;
    
    constructor(private runtimeSettingsService: RuntimeSettingsService) { }

    getRuntimeSettings(): void {
        //this.data = this.runtimeSettingsService.getRuntimeSettings();
        /*
        this.runtimeSettingsService.getRuntimeSettings().then(
            settings => this.runtimeSettings = settings
        );
        */
        this.runtimeSettingsService.getRuntimeSettings().then(
            settings => {
                /*
                this.reportInterval = settings.ReportInterval;
                this.pingInterval = settings.PingInterval;
                */
                Object.assign(this, settings);
            }
        );
        
    }

    ngOnInit(): void {
        this.getRuntimeSettings();
    }
}
