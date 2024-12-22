import { Component, EventEmitter, Output } from '@angular/core';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-image-upload',
  template: `
    <div class="drag-drop-container" *ngIf="imagePreviews.length === 0" (click)="fileInput.click()">
    <small>Upload Image</small>
      <ngx-file-drop (onFileDrop)="onFileDrop($event)">
        <div class="file-drop-zone">
          Drag and drop your image here or click to upload
        </div>
      </ngx-file-drop>
      <input #fileInput type="file" accept="image/*" (change)="onFileSelected($event)" style="display: none;" multiple>
    </div>

    <div *ngIf="imagePreviews.length > 0" class="preview-container">
      <div *ngFor="let preview of imagePreviews; let i = index" class="image-preview">
        <img [src]="preview" alt="Preview" />
        <button class="remove-btn" (click)="removeImage(i)">X</button>
      </div>
    </div>
  `,
  styles: [
    `
      .drag-drop-container {
        border: 2px dashed #ccc;
        padding: 5px;
        text-align: center;
        border-radius: 10px;
        cursor: pointer;
      }
      .file-drop-zone {
        font-size: 16px;
        color: #666;
      }
      .preview-container {
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
      }
      .image-preview {
        position: relative;
        margin: 10px;
        width: 100px;
        height: 100px;
        overflow: hidden;
        border: 1px solid #ddd;
        border-radius: 5px;
      }
      .image-preview img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .remove-btn {
        position: absolute;
        top: 5px;
        right: 5px;
        background-color: red;
        color: white;
        border: none;
        padding: 5px 10px;
        cursor: pointer;
        border-radius: 5px;
      }
      .remove-btn:hover {
        background-color: darkred;
      }
      .upload-btn {
        background-color: green;
        color: white;
        border: none;
        padding: 10px 20px;
        cursor: pointer;
        margin-top: 20px;
        border-radius: 5px;
      }
      .upload-btn:hover {
        background-color: darkgreen;
      }
    `,
  ],
})
export class ImageUploadComponent {
  imagePreviews: string[] = []; // Array to hold image preview URLs
  imageFiles: File[] = []; // Array to hold the image files

  @Output() imagesUploaded = new EventEmitter<File[]>(); // Emit an array of image files

  // Handle the file drop event
  onFileDrop(files: NgxFileDropEntry[]) {
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
              this.imagePreviews.push(e.target.result);
              this.imageFiles.push(file);
              this.imagesUploaded.emit(this.imageFiles); // Emit the updated files
            };
            reader.readAsDataURL(file);
          } else {
            alert('Only image files are allowed!');
          }
        });
      }
    }
  }

  // Handle file selection via the file input
  onFileSelected(event: any) {
    const files: FileList = event.target.files; // Explicitly type files as FileList
    Array.from(files).forEach((file: File) => {  // Explicitly type file as File
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreviews.push(e.target.result);
          this.imageFiles.push(file);
          this.imagesUploaded.emit(this.imageFiles); // Emit the updated files
        };
        reader.readAsDataURL(file);
      } else {
        alert('Only image files are allowed!');
      }
    });
  }

  // Upload images (this is a placeholder function)
  uploadImages() {
    console.log('Uploading images...', this.imageFiles);

    // Implement your upload logic here
    // For example, you can send the files to the server using an HTTP request.
    // Once upload is successful, you can reset the preview and file arrays.
  }

  // Remove a specific image by index
  removeImage(index: number) {
    this.imagePreviews.splice(index, 1);
    this.imageFiles.splice(index, 1);
    this.imagesUploaded.emit(this.imageFiles); // Emit updated files

    // If no images are left, show the drag-and-drop area again
    if (this.imagePreviews.length === 0) {
      this.imagesUploaded.emit([]); // Reset the emitted files
    }
  }
}
