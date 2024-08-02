import { Component, computed, OnDestroy, OnInit } from '@angular/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { AdminStorageService } from '../../services/admin-storage.service';
import { SubscriptionAccumulator } from '../../../../../../core/helpers/SubscriptionAccumulator';
import { tap } from 'rxjs';
import onScan from 'onscan.js';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { hasKazakhChars } from '../../../../../../shared/functions/hasKazakhChars.function';
import { hasRussianChars } from '../../../../../../shared/functions/hasRussianChars.function';
import { UploadFileComponent } from '../upload-file/upload-file.component';

@Component({
  selector: 'app-storage-table',
  standalone: true,
  imports: [
    PaginatorModule,
    InputSwitchModule,
    ReactiveFormsModule,
    UploadFileComponent,
  ],
  templateUrl: './storage-table.component.html',
  styleUrl: './storage-table.component.scss',
})
export class StorageTableComponent
  extends SubscriptionAccumulator
  implements OnInit, OnDestroy
{
  allOrders = computed(() => this.adminStorageService.allOrders());
  isAddingOrder = new FormControl(false);
  isIssueOrder = new FormControl(false);

  constructor(
    private adminStorageService: AdminStorageService,
    private toastr: ToastrService,
  ) {
    super();
    this.addSubscriber(
      this.adminStorageService.allOrdersParams$
        .pipe(
          tap((params) => {
            this.adminStorageService.getAllOrders();
          }),
        )
        .subscribe(),
    );

    this.isAddingOrder.valueChanges
      .pipe(
        tap((value) => {
          if (value) {
            this.isIssueOrder.setValue(false);
          }
        }),
      )
      .subscribe();

    this.isIssueOrder.valueChanges
      .pipe(
        tap((value) => {
          if (value) {
            this.isAddingOrder.setValue(false);
          }
        }),
      )
      .subscribe();
  }

  ngOnInit(): void {
    onScan.attachTo(document, {
      suffixKeyCodes: [13], // enter-key expected at the end of a scan
      reactToPaste: false, // Compatibility to built-in scanners in paste-mode (as opposed to keyboard-mode)
      onScan: (sCode, iQty) => {
        // Alternative to document.addEventListener('scan')

        console.log(hasKazakhChars(sCode));
        console.log(hasRussianChars(sCode));
        console.log(sCode);
        if (hasKazakhChars(sCode) || hasRussianChars(sCode)) {
          this.toastr.warning('Переключитесь на английскую раскладку');
          return;
        }
        if (this.isAddingOrder.value) {
          this.adminStorageService.addTrackNumbers(sCode);
        } else if (this.isIssueOrder.value) {
          this.adminStorageService.issueGoods(sCode);
        } else {
          this.toastr.warning('Выберите тип операций');
        }
      },
    });
  }

  override ngOnDestroy(): void {
    onScan.detachFrom(document);
  }

  onPageChange(event: PaginatorState) {
    this.adminStorageService.allOrdersParams.update((prevValue) => {
      return { ...prevValue, page: event.page ?? 5 };
    });
    document
      .getElementById('ordersByClientTable')
      ?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }

  onProductDelete(orderID: number, trackNumber: string) {
    this.adminStorageService.deleteTrackNumberByID(orderID, trackNumber);
  }

  openUploadModal() {
    this.adminStorageService.isUploadModalVisible.set(true);
  }
}
