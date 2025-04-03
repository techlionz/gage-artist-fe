import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ListControllerComponent } from 'src/app/base/components/list-controller.component';
import { Global } from 'src/app/base/services/global';
import { HttpxService } from 'src/app/base/services/httpx.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends ListControllerComponent implements OnInit {

  isDropdownOpen = false;
  selectedFaceStatus: { [key: string]: string } = {}; 
  artistForm!: FormGroup;
  isEditing: string | null =null; 
  public records: any;
  public addCompanyUrl: string = 'affiliate-transactions/add';
  public pageOptions = Global.pageOptions();
  public msgModal: any;
  public error_message = "" ;
  public success_message = "" ;
  allImageFiles: { [key: string]: File[] } = {}; // Map to store files with keys as unique identifiers
  flags: Array<{ country: string; flag: string }> = [];
  filteredFlags: Array<{ country: string; flag: string }> = [];

  public commonError: string = "";

  constructor(
    private httpx: HttpxService,
    private dialog: MatDialog,
    private location: Location,
    private http: HttpClient,
    private fb: FormBuilder,
  ) {
    super(location, httpx);
    this.artistForm = this.fb.group({
      real_name: [{ value: '', disabled: true }],
      nickname: [{ value: '', disabled: true }],
      id_status: [''],
      country: [''],
      face_status: [''],
      file: [''],
      flag: [''],
    });
  }

  // Row identifier
  public rowId: string = "";
  public search: string = "";
  public affiliateId: string = "1";
  public requestId: string = "1";

  public sort: any = { name: "name", order: "ASC" };
  imageStatus: { [id: string]: boolean } = {}; // Start with an empty object

  override ngOnInit(): void {
    super.ngOnInit();
    this.refreshList(this.pageOptions.pageEvents);
    this.fetchFlags();
  }

  handlePageEvent(event: PageEvent) {
    this.refreshList(event);
  }

  refreshList(event: PageEvent) {
    const params = '&pageIndex=' + event.pageIndex + '&pageSize=' + event.pageSize + '&sort=' + this.sort.name + '&order=' + this.sort.order;

    this.httpx.get(Global.api('artist/requests' + '?search=' + this.search + params)).subscribe((data: any) => {
      this.records = data.data;
      this.pageOptions.pageEvents.length = data.recordsFiltered;
    });
  }

  onSearch(data: any) {
    this.search = data;
    this.refreshList(this.pageOptions.pageEvents);
  }

  onSort(a: any) {
    this.sort = a;
    this.refreshList(this.pageOptions.pageEvents);
  }

  // Handle images uploaded from child components
  onImagesUploaded(id: string, ids: string, images: File[]) {
    this.imageStatus[id] = true ;
    const key = `${id}_${ids}`; // Unique key for storing files
    this.allImageFiles[key] = images; // Store files under the specific key

    this.error_message = ""
    this.success_message = ""
  }

  // Save all images via an AJAX request
  saveChanges(id: string) {
  
  console.log("Nickname Value: ", this.artistForm.get('nickname')?.value);
    const formData = new FormData();
    formData.append('id', id);

    let hasFiles = false;

    for (const key in this.allImageFiles) {
      if (this.allImageFiles[key].length > 0) { 
        hasFiles = true;
        this.allImageFiles[key].forEach((file, index) => {
        formData.append(`images[${key}]`, file, file.name);
      });
    }
  }

    const requestBody = {
      real_name: this.artistForm.get('real_name')?.value || null, 
      nickname: this.artistForm.get('nickname')?.value || null,  
      id: id,
      face_status: this.artistForm.get('face_status')?.value || null,
      id_status: this.artistForm.get('id_status')?.value || null,
      country: this.artistForm.get('country')?.value || null,
    };

    const requestPayload = hasFiles ? formData : JSON.stringify(requestBody);
    const requestOptions = hasFiles ? {} : { headers: { 'Content-Type': 'application/json' } };

    this.http.post(Global.api(Global.API_ARTIST_REQUEST), requestPayload,  requestOptions)
      .pipe(
        catchError(error => {
          console.error('Upload failed', error);
          this.error_message = error?.error?.messages?.common || 'No data provided' ;
          this.artistForm.reset();
          setTimeout(() => {
            this.error_message = "" ;
          }, 2000)
          return of(null);
          
        })
      )
      .subscribe((response: any ) => {
        if (response) {
          this.success_message = response.data
          this.imageStatus[id] = false
          this.refreshList(this.pageOptions.pageEvents);
          this.isEditing = null; 
          this.artistForm.reset();
          setTimeout(() => {
            this.success_message = "" ;
          }, 2000)
        }
      });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  setImage(file: string){
    this.artistForm.patchValue({ file: file });
    console.log("image file: " + file)
  }

  selectedStatus: string = '';

  handleStatusSelected(status: string) {
    this.selectedStatus = status; 
    console.log("Selected Status:", this.selectedStatus);
    this.artistForm.patchValue({ id_status: this.selectedStatus });
  }
  enableEdit(id: string) {
    this.isEditing = id;
    this.artistForm.enable();
  }

  closeEdit(){
    this.isEditing = null;
    this.artistForm.disable(); 
  }

  onFaceStatusChange(event: any) {
    this.artistForm.patchValue({ face_status: event.target.value }); 
}

setStatus(status: string) {
  this.artistForm.patchValue({ id_status: status });
}


  // Fetch country flags from API
  fetchFlags(): void {
    this.httpx.get(Global.api('flags')).subscribe((data: any) => {
      this.flags = data.data;
      // console.log("flags", this.flags);
      this.filteredFlags = [...this.flags]; 
      // console.log("Flags data fetched:", this.flags);
    });
  }

  filterCountries(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredFlags = [...this.flags].sort((a, b) => {
      const aMatch = a.country.toLowerCase().includes(searchValue);
      const bMatch = b.country.toLowerCase().includes(searchValue);
      return (bMatch ? 1 : 0) - (aMatch ? 1 : 0);
    });
  }

  selectCountry( country: any, flag: any) {
    this.artistForm.patchValue({ country: country });
    this.artistForm.patchValue({ flag: flag });
    this.isDropdownOpen = false;
  }
}
