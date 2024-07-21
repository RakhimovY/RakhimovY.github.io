import { Component } from '@angular/core';
import { CommonButtonComponent } from '../../../../../../shared/components/common-button/common-button.component';
import { DialogModule } from 'primeng/dialog';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ISavedProductsList } from '../../../../interface/orders.interface';

@Component({
  selector: 'app-orders-filter',
  standalone: true,
  imports: [CommonButtonComponent, DialogModule, ReactiveFormsModule],
  templateUrl: './orders-filter.component.html',
  styleUrl: './orders-filter.component.scss',
})
export class OrdersFilterComponent {
  visible: boolean = false;

  product = new FormControl('', [Validators.required, Validators.minLength(4)]);
  productName = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
  ]);

  savedProductsLists: ISavedProductsList[] = [];

  constructor() {}

  showDialog() {
    this.visible = true;
  }

  onSaveProduct() {
    if (this.product.valid && this.productName.valid) {
      this.savedProductsLists.unshift({
        id: this.savedProductsLists.length,
        productID: this.product.value,
        productName: this.productName.value,
      });
      this.product.reset();
      this.productName.reset();
    }
  }

  onDeleteSavedProduct(productID: number) {
    this.savedProductsLists = this.savedProductsLists.filter(
      (product) => product.id !== productID,
    );
  }

  addToMyOrders() {
    this.savedProductsLists = [];
    this.onHideModalWindow();
  }

  onHideModalWindow() {
    this.visible = false;
  }
}
