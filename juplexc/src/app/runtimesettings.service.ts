import { Injectable } from '@angular/core';
import { RuntimeSettings } from './runtimesettings';
import { RUNTIMESETTINGS_M } from './mock-runtimesettings';

@Injectable()
export class RuntimeSettingsService {
    getRuntimeSettings(): RuntimeSettings {
        return RUNTIMESETTINGS_M;
    }
}