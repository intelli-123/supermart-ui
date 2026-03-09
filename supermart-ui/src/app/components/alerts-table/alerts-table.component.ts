import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type AlertStatus = 'ALERT' | 'FAULT' | 'WARNING';
export type DeviceType = 'FREEZER' | 'FRIDGE' | 'COOLER';

export interface AlertRow {
  id: string;
  serial: string;
  store: string;
  unit: string;
  deviceType: DeviceType;
  temperature: string;
  threshold: string;
  status: AlertStatus;
}

@Component({
  selector: 'app-alerts-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alerts-table.component.html',
  styleUrl: './alerts-table.component.scss'
})
export class AlertsTableComponent {
  rows = input<AlertRow[]>([]);
  viewAll = output<void>();
  viewDevice = output<string>();

  onViewAll(): void {
    this.viewAll.emit();
  }

  onViewDevice(id: string): void {
    this.viewDevice.emit(id);
  }

  statusClass(status: AlertStatus): string {
    return `badge badge--${status.toLowerCase()}`;
  }

  typeClass(type: DeviceType): string {
    return `badge badge--type-${type.toLowerCase()}`;
  }
}
