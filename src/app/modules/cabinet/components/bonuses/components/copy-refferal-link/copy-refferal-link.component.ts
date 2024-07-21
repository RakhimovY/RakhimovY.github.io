import { Component } from '@angular/core';
import { CommonButtonComponent } from '../../../../../../shared/components/common-button/common-button.component';
import { Clipboard } from '@angular/cdk/clipboard';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-copy-refferal-link',
  standalone: true,
  imports: [CommonButtonComponent],
  templateUrl: './copy-refferal-link.component.html',
  styleUrl: './copy-refferal-link.component.scss',
})
export class CopyRefferalLinkComponent {
  link = 'http://localhost:4300/auth/sign_up?ref=1';

  constructor(
    private clipboard: Clipboard,
    private toast: ToastrService,
  ) {}

  copyLink() {
    this.toast.success('Текст успешно скопирован');
    this.clipboard.copy(this.link);
  }
}
