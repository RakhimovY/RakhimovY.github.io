import { Component } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';
import { SubscriptionAccumulator } from '../../../../../../core/helpers/SubscriptionAccumulator';
import { tap } from 'rxjs';
import { DialogModule } from 'primeng/dialog';
import { AdminStorageService } from '../../services/admin-storage.service';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [FileUploadModule, DialogModule, CdkDropList, CdkDrag],
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.scss',
})
export class UploadFileComponent extends SubscriptionAccumulator {
  visible: boolean = false;
  file: File | null = null;

  constructor(private adminStorageService: AdminStorageService) {
    super();
    this.addSubscriber(
      this.adminStorageService.isFileUploaded$
        .pipe(
          tap((value) => {
            this.deleteFile();
          }),
        )
        .subscribe(),
    );
    this.addSubscriber(
      this.adminStorageService.isUploadModalVisible$
        .pipe(
          tap((value) => {
            this.visible = value;
          }),
        )
        .subscribe(),
    );
  }

  onHideModalWindow() {
    this.adminStorageService.isUploadModalVisible.set(false);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.file = (event as any).dataTransfer.files[0];
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  openFile() {
    document.getElementById('fileInput')?.click();
  }

  sendFile() {
    const formData = new FormData();
    formData.append('file', this.file as Blob); // Добавляем файл в форму данных
    this.adminStorageService.uploadFile(formData);
  }

  deleteFile() {
    this.file = null;
  }
}
