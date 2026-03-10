import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

export interface DashboardSummary {
  totalStores: number;
  activeDevices: number;
  faultyDevices: number;
  openIncidents: number;
  alertsLastHour: number;
  asOf: string;
}

export interface AlertDevice {
  deviceId: number;
  deviceSerial: string;
  status: string;
  lastSeenAt: string;
  storeName: string;
  unitName: string;
  latestTemperature: number;
  isAlert: boolean;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

interface PagedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  private headers(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${this.auth.getToken()}` });
  }

  getSummary(): Observable<ApiResponse<DashboardSummary>> {
    return this.http.get<ApiResponse<DashboardSummary>>(
      `${environment.apiUrl}/dashboard/summary`,
      { headers: this.headers() }
    );
  }

  getAlerts(page = 0, size = 20): Observable<ApiResponse<PagedResponse<AlertDevice>>> {
    return this.http.get<ApiResponse<PagedResponse<AlertDevice>>>(
      `${environment.apiUrl}/dashboard/alerts?page=${page}&size=${size}`,
      { headers: this.headers() }
    );
  }
}
