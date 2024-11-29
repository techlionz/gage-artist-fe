import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModeToggleComponent } from './mode-toggle/mode-toggle.component';
import { BrowserModule } from '@angular/platform-browser';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';
import { BoxCardComponent } from './box-card/box-card.component';
import { NewButtonComponent } from './new-button/new-button.component';
import { TrashIconComponent } from './trash-icon/trash-icon.component';
import { CancelButtonComponent } from './cancel-button/cancel-button.component';
import { SubmitButtonComponent } from './submit-button/submit-button.component';
import { FormTextComponent } from './form-text/form-text.component';
import { FormSelectComponent } from './form-select/form-select.component';
import { FormTextareaComponent } from './form-textarea/form-textarea.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { FormCheckboxComponent } from './form-checkbox/form-checkbox.component';
import { TagEmailComponent } from './tag-email/tag-email.component';
import { TagPhoneComponent } from './tag-phone/tag-phone.component';
import { TagUrlComponent } from './tag-url/tag-url.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { SortableComponent } from './sortable/sortable.component';

@NgModule({
  declarations: [
    ModeToggleComponent,
    DeleteConfirmComponent,
    BoxCardComponent,
    NewButtonComponent,
    TrashIconComponent,
    CancelButtonComponent,
    SubmitButtonComponent,
    FormTextComponent,
    FormSelectComponent,
    FormTextareaComponent,
    PageTitleComponent,
    FormCheckboxComponent,
    TagEmailComponent,
    TagPhoneComponent,
    TagUrlComponent,
    SearchBoxComponent,
    SortableComponent
  ],
  exports: [
    ModeToggleComponent,
    BoxCardComponent,
    DeleteConfirmComponent,
    NewButtonComponent,
    TrashIconComponent,
    CancelButtonComponent,
    SubmitButtonComponent,
    FormTextComponent,
    FormSelectComponent,
    FormTextareaComponent,
    PageTitleComponent,
    FormCheckboxComponent,
    TagEmailComponent,
    TagPhoneComponent,
    TagUrlComponent,
    SearchBoxComponent,
    SortableComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule
  ]
})

export class FragmentsModule { }
