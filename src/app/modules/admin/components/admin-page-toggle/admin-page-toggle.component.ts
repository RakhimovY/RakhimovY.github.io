import { AfterViewInit, Component } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import { EAdminPage } from '../../enum/admin-page.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-page-toggle',
  standalone: true,
  imports: [NgClass, NgStyle],
  templateUrl: './admin-page-toggle.component.html',
  styleUrl: './admin-page-toggle.component.scss',
})
export class AdminPageToggleComponent implements AfterViewInit {
  adminPageState: EAdminPage =
    (localStorage.getItem('adminPageState') as EAdminPage) ??
    EAdminPage.STORAGE;
  activeBox!: HTMLElement;
  protected readonly EAdminPage = EAdminPage;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    this.activeBox = document.querySelector(
      '.active-button-box',
    ) as HTMLElement;
    this.changeState(this.adminPageState);
  }

  changeState(adminPageType: EAdminPage) {
    this.adminPageState = adminPageType;
    localStorage.setItem('adminPageState', adminPageType);
    if (adminPageType === EAdminPage.STORAGE) {
      this.router.navigate(['admin', 'storage']);
      this.activeBox.style.left = '3px';
      this.activeBox.style.transform = 'translate(0)';
    } else if (adminPageType === EAdminPage.CLIENTS) {
      this.router.navigate(['admin', 'clients']);
      this.activeBox.style.left = '50%';
      this.activeBox.style.transform = 'translate(-50%)';
    } else {
      this.router.navigate(['admin', 'manage']);
      this.activeBox.style.left = 'calc(100% - 3px)';
      this.activeBox.style.transform = 'translate(-100%)';
    }
  }

  getActiveStatus(adminPageType: EAdminPage) {
    return this.adminPageState === adminPageType;
  }
}
