import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Settings } from '../models/setting';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) { }


setting(setting: Settings) {
    return this.http.put(`/settings`, setting);
}

getSettings() {
  return this.http.get<Settings[]>(`/settings`);
}

}
