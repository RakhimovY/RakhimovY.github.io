import { Component } from '@angular/core';
import { InputsComponent } from './components/inputs/inputs.component';
import { StorageTableComponent } from './components/storage-table/storage-table.component';
import { StatusButtonsComponent } from './components/status-buttons/status-buttons.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';

@Component({
  selector: 'app-storage',
  standalone: true,
  imports: [
    InputsComponent,
    StorageTableComponent,
    StatusButtonsComponent,
    UploadFileComponent,
  ],
  templateUrl: './storage.component.html',
  styleUrl: './storage.component.scss',
})
export class StorageComponent {}
