import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpiCardComponent } from '../kpi-card/kpi-card.component';

export interface KpiMetric {
  icon: string;
  value: string;
  label: string;
  accentColor: string;
}

@Component({
  selector: 'app-kpi-cards',
  standalone: true,
  imports: [CommonModule, KpiCardComponent],
  templateUrl: './kpi-cards.component.html',
  styleUrl: './kpi-cards.component.scss'
})
export class KpiCardsComponent {
  metrics: KpiMetric[] = [
    { icon: '🏬', value: '3,000',  label: 'Active Locations', accentColor: '#3b82f6' },
    { icon: '📡', value: '14,820', label: 'Online Sensors',   accentColor: '#10b981' },
    { icon: '⚠️', value: '47',     label: 'Faulty Devices',   accentColor: '#f87171' },
    { icon: '🔥', value: '23',     label: 'Open Incidents',   accentColor: '#f59e0b' },
    { icon: '🌡️', value: '112',    label: 'Alerts Last Hour', accentColor: '#f97316' }
  ];
}
