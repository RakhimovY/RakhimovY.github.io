import { Component, computed } from '@angular/core';
import { CommonButtonComponent } from '../../../../../../shared/components/common-button/common-button.component';
import { Clipboard } from '@angular/cdk/clipboard';
import { ToastrService } from 'ngx-toastr';
import { CabinetService } from '../../../../services/cabinet.service';

@Component({
  selector: 'app-copy-refferal-link',
  standalone: true,
  imports: [CommonButtonComponent],
  templateUrl: './copy-refferal-link.component.html',
  styleUrl: './copy-refferal-link.component.scss',
})
export class CopyRefferalLinkComponent {
  link = 'http://localhost:4300/auth/sign_up?ref=';
  userInfo = computed(() => this.cabinetService.userInfo());

  constructor(
    private clipboard: Clipboard,
    private toast: ToastrService,
    private cabinetService: CabinetService,
  ) {}

  copyLink(fullLink: string) {
    this.toast.success('Текст успешно скопирован');
    this.clipboard.copy(fullLink);
  }
}
