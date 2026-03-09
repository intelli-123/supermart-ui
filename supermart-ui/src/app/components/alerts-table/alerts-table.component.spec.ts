import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertsTableComponent, AlertRow } from './alerts-table.component';

const mockRows: AlertRow[] = [
  {
    id: '1', serial: 'DEV-000342', store: 'SM-ATL-042 — Atlanta, GA',
    unit: 'Freezer 3A', deviceType: 'FREEZER', temperature: '−10.2°C',
    threshold: '−18°C to −15°C', status: 'ALERT'
  },
  {
    id: '2', serial: 'DEV-001104', store: 'SM-CHI-017 — Chicago, IL',
    unit: 'Refrigerator 1B', deviceType: 'FRIDGE', temperature: '11.4°C',
    threshold: '0°C to 8°C', status: 'FAULT'
  }
];

describe('AlertsTableComponent', () => {
  let fixture: ComponentFixture<AlertsTableComponent>;
  let component: AlertsTableComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [AlertsTableComponent] }).compileComponents();
    fixture = TestBed.createComponent(AlertsTableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a row per alert', () => {
    fixture.componentRef.setInput('rows', mockRows);
    fixture.detectChanges();
    const rows = fixture.nativeElement.querySelectorAll('.alerts-table__row');
    expect(rows.length).toBe(2);
  });

  it('should show empty state when no rows', () => {
    fixture.componentRef.setInput('rows', []);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.alerts-table__empty')).toBeTruthy();
  });

  it('should emit viewDevice with row id when View is clicked', () => {
    fixture.componentRef.setInput('rows', mockRows);
    fixture.detectChanges();
    const emitted: string[] = [];
    component.viewDevice.subscribe((id: string) => emitted.push(id));
    fixture.nativeElement.querySelectorAll('.alerts-table__action-btn')[0].click();
    expect(emitted).toEqual(['1']);
  });
});
