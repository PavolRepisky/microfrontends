import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SettingsModalComponent } from '../settings-modal/settings-modal.component';

interface NavItem {
  icon: string;
  label: string;
  url: string;
  active: boolean;
}

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, NgClass, RouterLink, TranslateModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  title = 'Microfrontends';

  constructor(private modalService: NgbModal) {}

  navItems: NavItem[] = [
    {
      icon: 'bi-house-door',
      label: 'navigation.dashboard',
      active: true,
      url: '/',
    },
    {
      icon: 'bi-check-lg',
      label: 'navigation.tasks',
      active: false,
      url: '/tasks',
    },
    {
      icon: 'bi-people',
      label: 'navigation.users',
      active: false,
      url: '/users',
    },
  ];

  openSettings() {
    this.modalService.open(SettingsModalComponent);
  }
}
