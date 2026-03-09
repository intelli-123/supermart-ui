import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { provideRouter } from '@angular/router';

describe('SidebarComponent', () => {
  let fixture: ComponentFixture<SidebarComponent>;
  let component: SidebarComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SidebarComponent],
      providers: [provideRouter([])]
    }).compileComponents();
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 4 nav items', () => {
    const items = fixture.nativeElement.querySelectorAll('.sidebar__nav-item');
    expect(items.length).toBe(4);
  });

  it('should mark dashboard as active by default', () => {
    const active = fixture.nativeElement.querySelector('.sidebar__nav-item--active');
    expect(active?.textContent).toContain('Dashboard');
  });

  it('should emit navSelect when a nav item is clicked', () => {
    const emitted: string[] = [];
    component.navSelect.subscribe((v: string) => emitted.push(v));
    component.onNavClick(component.navItems[1]);
    expect(emitted).toEqual(['stores']);
  });
});
