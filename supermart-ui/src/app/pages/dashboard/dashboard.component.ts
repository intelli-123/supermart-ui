import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { KpiCardsComponent } from '../../components/kpi-cards/kpi-cards.component';
import { AlertsTableComponent, AlertRow } from '../../components/alerts-table/alerts-table.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [SidebarComponent, TopbarComponent, KpiCardsComponent, AlertsTableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  lastUpdated = '14:32:05';

  alertRows: AlertRow[] = [
    {
      id: '1',
      serial: 'DEV-000342',
      store: 'SM-ATL-042 — Atlanta, GA',
      unit: 'Freezer 3A',
      deviceType: 'FREEZER',
      temperature: '−10.2°C',
      threshold: '−18°C to −15°C',
      status: 'ALERT'
    },
    {
      id: '2',
      serial: 'DEV-001104',
      store: 'SM-CHI-017 — Chicago, IL',
      unit: 'Refrigerator 1B',
      deviceType: 'FRIDGE',
      temperature: '11.4°C',
      threshold: '0°C to 8°C',
      status: 'FAULT'
    },
    {
      id: '3',
      serial: 'DEV-002891',
      store: 'SM-NYC-003 — New York, NY',
      unit: 'Freezer 2C',
      deviceType: 'FREEZER',
      temperature: '−8.7°C',
      threshold: '−22°C to −18°C',
      status: 'ALERT'
    }
  ];

  constructor(private router: Router) {}

  onNavSelect(routeId: string): void {
    this.router.navigate([`/${routeId}`]);
  }

  onViewAllDevices(): void {
    this.router.navigate(['/devices']);
  }

  onViewDevice(deviceId: string): void {
    this.router.navigate(['/devices', deviceId]);
  }
}
