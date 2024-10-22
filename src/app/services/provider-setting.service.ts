import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProviderSetting } from '../models/provider.model';

@Injectable({
  providedIn: 'root',
})
export class ProviderSettingService {
  private apiUrl = 'https://localhost:7279/api/provider-setting';

  constructor(private httpClient: HttpClient) {}

  getProviderSettingsByProviderId(
    providerId: number
  ): Observable<ProviderSetting[]> {
    return this.httpClient.get<ProviderSetting[]>(
      this.apiUrl + '/' + providerId
    );
  }

  getProviderSettings(): Observable<ProviderSetting[]> {
    return this.httpClient.get<ProviderSetting[]>(this.apiUrl);
  }

  getProviderSetting(skId: string): Observable<ProviderSetting[]> {
    return this.httpClient.get<ProviderSetting[]>(
      this.apiUrl + '?skId=' + skId
    );
  }

  createProviderSetting(
    provider: ProviderSetting
  ): Observable<ProviderSetting> {
    return this.httpClient.post<ProviderSetting>(this.apiUrl, provider);
  }

  updateProviderSetting(
    skId: string,
    provider: ProviderSetting
  ): Observable<ProviderSetting> {
    return this.httpClient.post<ProviderSetting>(`${this.apiUrl}`, provider);
  }

  deleteProviderSetting(skId: string): Observable<ProviderSetting> {
    return this.httpClient.delete<ProviderSetting>(
      this.apiUrl + '?skId=' + skId
    );
  }
}
