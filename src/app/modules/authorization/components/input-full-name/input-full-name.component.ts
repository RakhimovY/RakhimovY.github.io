import {Component} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-input-full-name',
  standalone: true,
  imports: [
    TranslateModule
  ],
  templateUrl: './input-full-name.component.html',
  styleUrl: './input-full-name.component.scss'
})
export class InputFullNameComponent {

}
