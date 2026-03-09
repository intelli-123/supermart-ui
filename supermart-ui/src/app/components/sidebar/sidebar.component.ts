import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  route: string;
}

export interface SidebarUser {
  initials: string;
  name: string;
  role: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  activeRoute = input<string>('dashboard');
  user = input<SidebarUser>({ initials: 'JS', name: 'John Smith', role: 'Admin' });
  navSelect = output<string>();

  navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '⊞', route: '/dashboard' },
    { id: 'stores',    label: 'Stores',    icon: '⊙', route: '/stores'    },
    { id: 'devices',   label: 'Devices',   icon: '☁', route: '/devices'   },
    { id: 'incidents', label: 'Incidents', icon: '⚠', route: '/incidents' }
  ];

  onNavClick(item: NavItem): void {
    this.navSelect.emit(item.id);
  }

  isActive(item: NavItem): boolean {
    return item.id === this.activeRoute();
  }
}
