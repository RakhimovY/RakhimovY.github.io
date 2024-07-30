import { Component } from '@angular/core';
import { CommonButtonComponent } from '../../../../../../shared/components/common-button/common-button.component';
import { DialogModule } from 'primeng/dialog';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ISavedProductsList } from '../../../../interface/orders.interface';
import { debounceTime, tap } from 'rxjs';
import { CabinetService } from '../../../../services/cabinet.service';

@Component({
  selector: 'app-orders-filter',
  standalone: true,
  imports: [CommonButtonComponent, DialogModule, ReactiveFormsModule],
  templateUrl: './orders-filter.component.html',
  styleUrl: './orders-filter.component.scss',
})
export class OrdersFilterComponent {
  visible: boolean = false;

  searchFormControl: FormControl<string | null> = new FormControl(null);
  trackNumberFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);
  productNameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
  ]);

  savedProductsLists: ISavedProductsList[] = [];

  constructor(private cabinetService: CabinetService) {
    this.searchFormControl.valueChanges
      .pipe(
        debounceTime(400),
        tap((value) => {
          this.cabinetService.ordersParams.update((prevValue) => {
            return { ...prevValue, searchByTrack: value ?? undefined };
          });
        }),
      )
      .subscribe();
  }

  showDialog() {
    this.visible = true;
  }

  onSaveProduct() {
    if (
      this.trackNumberFormControl.valid &&
      this.productNameFormControl.valid
    ) {
      this.savedProductsLists.unshift({
        id: this.savedProductsLists.length,
        trackNumber: this.trackNumberFormControl.value as string,
        productName: this.productNameFormControl.value as string,
      });
      this.trackNumberFormControl.reset();
      this.productNameFormControl.reset();
    }
  }

  onDeleteSavedProduct(productID: number) {
    this.savedProductsLists = this.savedProductsLists.filter(
      (product) => product.id !== productID,
    );
  }

  addToMyOrders() {
    if (
      this.savedProductsLists.map((el) => {
        return {
          trackNumber: el.trackNumber,
          productName: el.productName,
        };
      }).length > 0
    ) {
      this.cabinetService.registerTrackNumber(
        this.savedProductsLists.map((el) => {
          return {
            trackNumber: el.trackNumber,
            productName: el.productName,
          };
        }),
      );
    } else if (
      this.trackNumberFormControl.valid &&
      this.productNameFormControl.valid
    ) {
      this.cabinetService.registerTrackNumber([
        {
          trackNumber: this.trackNumberFormControl.value as string,
          productName: this.productNameFormControl.value as string,
        },
      ]);
    }
    this.savedProductsLists = [];
    this.onHideModalWindow();
  }

  onHideModalWindow() {
    this.visible = false;
  }
}
