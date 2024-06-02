import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-common-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './common-button.component.html',
  styleUrl: './common-button.component.scss',
})
export class CommonButtonComponent {
  @Input() text!: string;
  @Input() type: 'primary' = 'primary';
  @Output() clickBTN: EventEmitter<any> = new EventEmitter();

  clickBtn() {
    this.clickBTN.emit();
  }
}
