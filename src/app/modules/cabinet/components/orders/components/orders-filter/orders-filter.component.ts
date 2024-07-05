import { Component, OnInit } from '@angular/core';
import { CommonButtonComponent } from '../../../../../../shared/components/common-button/common-button.component';
import { DialogModule } from 'primeng/dialog';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ISavedProductsList } from '../../../../interface/orders.interface';
import { tap } from 'rxjs';

@Component({
  selector: 'app-orders-filter',
  standalone: true,
  imports: [CommonButtonComponent, DialogModule, ReactiveFormsModule],
  templateUrl: './orders-filter.component.html',
  styleUrl: './orders-filter.component.scss',
})
export class OrdersFilterComponent implements OnInit {
  visible: boolean = false;

  product = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(6),
  ]);

  savedProductsLists: ISavedProductsList[] = [];

  constructor() {}

  ngOnInit(): void {
    this.product.valueChanges
      .pipe(
        tap((value) => {
          if (value?.length === 6) {
            this.onSaveProduct();
          }
        })
      )
      .subscribe();
  }

  showDialog() {
    this.visible = true;
  }

  onSaveProduct() {
    if (this.product.value) {
      this.savedProductsLists.unshift({
        id: this.savedProductsLists.length,
        productID: this.product.value,
      });
      this.product.reset();

      (document.getElementById('newProductInput') as HTMLInputElement).focus();
    }
  }

  onDeleteSavedProduct(productID: number) {
    this.savedProductsLists = this.savedProductsLists.filter(
      (product) => product.id !== productID
    );
  }

  addToMyOrders() {
    this.onHideModalWindow();
  }

  onHideModalWindow() {
    this.visible = false;
    this.savedProductsLists = [];
  }
}
