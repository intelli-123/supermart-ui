import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { KpiCardsComponent, KpiMetric } from '../../components/kpi-cards/kpi-cards.component';
import { AlertsTableComponent, AlertRow } from '../../components/alerts-table/alerts-table.component';
import { DashboardService } from '../../services/dashboard.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, SidebarComponent, TopbarComponent, KpiCardsComponent, AlertsTableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  lastUpdated = '';
  kpiMetrics: KpiMetric[] = [];
  alertRows: AlertRow[] = [];

  constructor(
    private router: Router,
    private dashboardService: DashboardService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.loadSummary();
    this.loadAlerts();
  }

  private loadSummary(): void {
    this.dashboardService.getSummary().subscribe({
      next: res => {
        if (res.success) {
          const d = res.data;
          this.lastUpdated = new Date(d.asOf).toLocaleTimeString();
          this.kpiMetrics = [
            { icon: '🏬', value: d.totalStores.toLocaleString(),    label: 'Active Locations', accentColor: '#3b82f6' },
            { icon: '📡', value: d.activeDevices.toLocaleString(),  label: 'Online Sensors',   accentColor: '#10b981' },
            { icon: '⚠️', value: d.faultyDevices.toLocaleString(),  label: 'Faulty Devices',   accentColor: '#f87171' },
            { icon: '🔥', value: d.openIncidents.toLocaleString(),  label: 'Open Incidents',   accentColor: '#f59e0b' },
            { icon: '🌡️', value: d.alertsLastHour.toLocaleString(), label: 'Alerts Last Hour', accentColor: '#f97316' }
          ];
        }
      },
      error: err => console.error('Failed to load summary:', err)
    });
  }

  private loadAlerts(): void {
    this.dashboardService.getAlerts().subscribe({
      next: res => {
        if (res.success) {
          this.alertRows = res.data.content.map(d => ({
            id: String(d.deviceId),
            serial: d.deviceSerial,
            store: d.storeName ?? '—',
            unit: d.unitName ?? '—',
            deviceType: 'FREEZER' as const,
            temperature: d.latestTemperature != null ? `${d.latestTemperature}°C` : '—',
            threshold: '—',
            status: d.status === 'FAULT' ? 'FAULT' : 'ALERT' as const
          }));
        }
      },
      error: err => console.error('Failed to load alerts:', err)
    });
  }

  onNavSelect(routeId: string): void {
    this.router.navigate([`/${routeId}`]);
  }

  onViewAllDevices(): void {
    this.router.navigate(['/devices']);
  }

  onViewDevice(deviceId: string): void {
    this.router.navigate(['/devices', deviceId]);
  }

  onLogout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
