import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-common-button',
  standalone: true,
  imports: [NgClass, NgStyle],
  templateUrl: './common-button.component.html',
  styleUrl: './common-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommonButtonComponent {
  @Input() text!: string;
  @Input() type: 'primary' | 'secondary' = 'primary';
  @Input() disabled: boolean = false;
  @Input() withFullWidth: boolean = false;
  @Output() clickBTN: EventEmitter<any> = new EventEmitter();

  clickBtn() {
    this.clickBTN.emit();
  }
}
