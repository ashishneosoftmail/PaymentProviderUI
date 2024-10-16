import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Provider } from '../app/pages/models/provider.model';


@Injectable({
  providedIn: 'root'
})
export class ProvidersettingService {

  private apiUrl = 'https://localhost:7279/api/Provider';



 
  constructor(private http: HttpClient) {}
  
  // createProvider(provider: Provider): Observable<Provider> {
  //   return this.http.post<Provider>(this.apiUrl, provider);
  // }

  // Method to submit data to the .NET Core API
  submitData(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, JSON.stringify(data), { headers });
  }

}
