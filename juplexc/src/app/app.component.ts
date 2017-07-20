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

    @Input() runtimeSettings: RuntimeSettings;

    constructor(private runtimeSettingsService: RuntimeSettingsService) { }

    getRuntimeSettings(): void {
        this.runtimeSettingsService.getRuntimeSettings().then(
            settings => this.runtimeSettings = settings
        );
    }

    ngOnInit(): void {
        this.getRuntimeSettings();
    }
}
