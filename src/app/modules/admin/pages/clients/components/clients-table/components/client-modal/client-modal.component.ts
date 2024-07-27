import { Component, computed } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { CommonButtonComponent } from '../../../../../../../../shared/components/common-button/common-button.component';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { AdminClientsService } from '../../../../services/admin-clients.service';
import { SubscriptionAccumulator } from '../../../../../../../../core/helpers/SubscriptionAccumulator';
import { tap } from 'rxjs';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-client-modal',
  standalone: true,
  imports: [
    DialogModule,
    CommonButtonComponent,
    AsyncPipe,
    ReactiveFormsModule,
    DatePipe,
    CurrencyPipe,
  ],
  templateUrl: './client-modal.component.html',
  styleUrl: './client-modal.component.scss',
})
export class ClientModalComponent extends SubscriptionAccumulator {
  clientModalForm = new FormGroup({
    amountToPay: new FormControl<number | null>(null, [
      Validators.required,
      Validators.minLength(1),
      Validators.nullValidator,
    ]),
    bonusesToMainClient: new FormControl<number | null>(null),
  });

  visible: boolean = false;
  client = computed(() => this.adminClientsService.client());

  constructor(private adminClientsService: AdminClientsService) {
    super();
    this.addSubscriber(
      this.adminClientsService.client$
        .pipe(
          tap((value) => {
            if (!!value) {
              this.visible = true;
              this.clientModalForm.controls.amountToPay.setValue(
                value.amountToPay,
              );
              this.clientModalForm.controls.bonusesToMainClient.setValue(
                value.bonuses,
              );
            }
          }),
        )
        .subscribe(),
    );
  }

  onHideModalWindow() {
    this.adminClientsService.client.set(null);
  }

  submitClientChanges() {
    const amountToPay = this.clientModalForm.controls.amountToPay
      .value as number;
    const bonusesToMainClient = this.clientModalForm.controls
      .bonusesToMainClient.value as number;
    this.adminClientsService.submitClientChanges(
      amountToPay,
      bonusesToMainClient,
    );
    this.visible = false;
  }
}
