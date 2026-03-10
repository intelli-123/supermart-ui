import { Component, input } from '@angular/core';
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
  metrics = input<KpiMetric[]>([]);
}
