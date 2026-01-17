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
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends ListControllerComponent implements OnInit {
  showPopup = false;
  // Define form fields dynamically
  formFields = [
    { label: 'VPIP  Hand', model: 'vpip_hand' },
    { label: 'VPIP Count', model: 'vpip_count' },
    { label: 'PFR Hand', model: 'pfr_hand' },
    { label: 'PFR Count', model: 'pfr_count' },
    { label: 'Three Bet Hand', model: 'three_bet_hand' },
    { label: 'Three Bet Count', model: 'three_bet_count' },
  ];
  // --- UI & State Management ---
  isDropdownOpen = false;
  selectedFaceStatus: { [key: string]: string } = {};
  artistForm!: FormGroup;
  isEditing: string | null = null;
  loading = false;
  loader = false;
  saving = false;
  currentId!: number;
  public records: any;
  public addCompanyUrl: string = 'affiliate-transactions/add';
  public pageOptions = Global.pageOptions();
  public msgModal: any;
  public error_message = '';
  public success_message = '';
  allImageFiles: { [key: string]: File[] } = {}; // Map to store files with keys as unique identifiers
  // --- Flag/Country Data ---
  flags: Array<{ country: string; flag: string }> = [];
  filteredFlags: Array<{ country: string; flag: string }> = [];
  // Cache-busting helper for images
  appendNoCache(url: string): string {
    return url + (url.includes('?') ? '&' : '?') + 'nocache=' + Math.random();
  }

  public commonError: string = '';

  constructor(
    private toastr: ToastrService,
    private httpx: HttpxService,
    private dialog: MatDialog,
    private location: Location,
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
  ) {
    super(location, httpx);
    // Initialize the Reactive Form with default disabled states for identity fields
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
  public rowId: string = '';
  public search: string = '';
  public affiliateId: string = '1';
  public requestId: string = '1';

  public sort: any = { name: 'name', order: 'ASC' };
  imageStatus: { [id: string]: boolean } = {}; // Start with an empty object

  override ngOnInit(): void {
    super.ngOnInit();
    this.refreshList(this.pageOptions.pageEvents); // Initial data load
    this.fetchFlags(); // Load country data for the dropdown
  }

  handlePageEvent(event: PageEvent) {
    this.refreshList(event);
  }

  /**
   * Fetches records from the server with pagination, search, and sorting.
   * Maps through records to apply cache-busting strings to image URLs.
   */

  refreshList(event: PageEvent) {
    const params =
      '&pageIndex=' +
      event.pageIndex +
      '&pageSize=' +
      event.pageSize +
      '&sort=' +
      this.sort.name +
      '&order=' +
      this.sort.order;

    this.httpx
      .get(Global.api('artist/requests' + '?search=' + this.search + params))
      .subscribe((data: any) => {
        this.records = data.data.map((record: any) => ({
          ...record,
          photo: this.appendNoCache(record.photo),
          avatar: this.appendNoCache(record.avatar),
          avatar2: this.appendNoCache(record.avatar2),
          // avatar3: this.appendNoCache(record.avatar3),
          id_photo: this.appendNoCache(record.id_photo),
          verified_photo: this.appendNoCache(record.verified_photo),
        }));
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

  /**
   * Handles the submission of changes (Images + Form Data).
   * Switches between FormData (for files) and JSON based on content.
   */

  // Handle images uploaded from child components
  onImagesUploaded(id: string, ids: string, images: File[]) {
    this.imageStatus[id] = true;
    const key = `${id}_${ids}`; // Unique key for storing files
    this.allImageFiles[key] = images; // Store files under the specific key

    this.error_message = '';
    this.success_message = '';
  }

/**
 * Processes and saves all changes for a specific record.
 * Handles both text data and multiple image file uploads.
 */
  saveChanges(id: string) {
    console.log('Nickname Value: ', this.artistForm.get('nickname')?.value);

    // Initialize FormData for potential file uploads
    const formData = new FormData();
    formData.append('id', id);

    // Map Reactive Form values to the FormData object
    formData.append('real_name', this.artistForm.get('real_name')?.value);
    formData.append('nickname', this.artistForm.get('nickname')?.value);
    formData.append('id_status', this.artistForm.get('id_status')?.value);
    formData.append('country', this.artistForm.get('country')?.value);
    formData.append('face_status', this.artistForm.get('face_status')?.value);

    console.log('Made FORM');
    for (const [key, value] of (formData as any).entries()) {
      console.log(`${key}:`, value);
    }

    // Check for uploaded files from child components
    let hasFiles = false;
    // Append any images uploaded via the child components
    for (const key in this.allImageFiles) {
      if (this.allImageFiles[key].length > 0) {
        hasFiles = true;
        this.allImageFiles[key].forEach((file, index) => {
          formData.append(`images[${key}]`, file, file.name);
        });
      }
    }

    // Prepare an alternative JSON body if no files are present
    const requestBody = {
      real_name: this.artistForm.get('real_name')?.value || '',
      nickname: this.artistForm.get('nickname')?.value || '',
      id: id,
      face_status: this.artistForm.get('face_status')?.value || '',
      id_status: this.artistForm.get('id_status')?.value || '',
      country: this.artistForm.get('country')?.value || '',
    };

    console.log(formData);
    console.log(requestBody);

    /**
   * 4. Hybrid Logic:
   * If files exist, we send 'formData'. The browser automatically sets the 
   * 'Content-Type' to 'multipart/form-data' with a unique boundary.
   * If no files exist, we send a stringified JSON body and set headers manually.
   */
    const requestPayload = hasFiles ? formData : JSON.stringify(requestBody);
    const requestOptions = hasFiles
      ? {} 
      // HttpClient automatically handles multipart headers
      : { headers: { 'Content-Type': 'application/json' } };
    // Execute the POST request
    this.http
      .post(
        Global.api(Global.API_ARTIST_REQUEST),
        requestPayload,
        requestOptions,
      )
      .pipe(
        catchError((error) => {
          // Handle failed upload/request
          console.error('Upload failed', error);
          this.error_message =
            error?.error?.messages?.common || 'No data provided';
          this.artistForm.reset();

          // Clear error message after 3 seconds
          setTimeout(() => {
            this.error_message = '';
          }, 3000);
          return of(null);
        }),
      )
      .subscribe((response: any) => {
        // Handle Success
        if (response) {
          this.success_message = response.data;
          this.imageStatus[id] = false; // Reset image pending status
          this.refreshList(this.pageOptions.pageEvents); // Reload table data
          this.isEditing = null; // Exit edit mode
          this.artistForm.reset(); // Clear form for next use

          // Clear success message after 3 seconds
          setTimeout(() => {
            this.success_message = '';
          }, 3000);
        }
      });
  }

  // Updates the 'real_name' field in the reactive form.
  onRealNameChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    this.artistForm.patchValue({ real_name: value });
  }

  // Updates the 'nickname' field in the reactive form.
  onNickNameChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    this.artistForm.patchValue({ nickname: value });
  }

  // toggle dropdown menu 
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // Updates the 'file' field in the reactive form.
  setImage(file: string) {
    this.artistForm.patchValue({ file: file });
    console.log('image file: ' + file);
  }

  /**
   * Inline Edit Management
   */
  enableEdit(id: string, one: any) {
    console.log(one);
    this.isEditing = id;
    this.artistForm.enable();
    this.artistForm.patchValue({
      real_name: one.real_name,
      nickname: one.nickname,
      id_status: one.id_status,
      country: one.country,
      face_status: one.face_status,
      file: one.file,
      flag: one.flag,
    });
    //this.artistForm.reset();
    this.isDropdownOpen = false;
  }

  // close edit
  closeEdit() {
    this.isEditing = null;
    this.artistForm.disable();
  }

  // Updates the 'face_status' field in the reactive form.
  onFaceStatusChange(event: any) {
    this.artistForm.patchValue({ face_status: event.target.value });
  }

 /**
 * Updates the 'id_status' field in the reactive form via an event.
 * Useful for standard HTML elements that emit an Event object.
 */
  onIdStatusChange(event: any) {
    this.artistForm.patchValue({ id_status: event.target.value });
  }

  /**
 * Directly updates the 'id_status' with a specific string value.
 * Commonly used when clicking a specific status button (e.g., [Approve] or [Reject]).
 * Unlike the 'Change' methods above, this takes a raw string instead of an event.
 */
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

  /**
   * Filters and re-orders the country flags based on user input.
   * Instead of removing non-matches, it pushes matching countries to the top.
   */
  filterCountries(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredFlags = [...this.flags].sort((a, b) => {
      const aMatch = a.country.toLowerCase().includes(searchValue);
      const bMatch = b.country.toLowerCase().includes(searchValue);
      return (bMatch ? 1 : 0) - (aMatch ? 1 : 0);
    });
  }

  // select country
  selectCountry(country: any, flag: any) {
    this.artistForm.patchValue({ country: country });
    this.artistForm.patchValue({ flag: flag });
    this.isDropdownOpen = false;
  }

  // download image
  downloadImage(url: string, id: string, flag: string) {
    fetch(url, { mode: 'cors' })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();
      })
      .then((blob) => {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = flag === '1' ? `${id}.jpg` : `ID_Proof_${id}.jpg`;
        a.click();
        URL.revokeObjectURL(objectUrl);
      })
      .catch((error) => {
        console.error('Download failed:', error);
      });
  }

  // goto last login page
  goToLastLogin(id: number, nickname: string) {
    this.router.navigate(['/last-login', id, nickname]);
  }

  formData: any = {};

  /**
   * Modal Logic for "Game Status"
   * Popup open
   */
  openPopup(id: number) {
    this.showPopup = true;
    this.currentId = id;
    this.loading = true;

    const url = Global.api(`show-game-status/${id}`);

    this.http.get<any>(url).subscribe({
      next: (res) => {
        this.formData = res.data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching player data:', err);
        this.loading = false;
      },
    });
  }

  // Close Popup
  closePopup() {
    this.showPopup = false;
    this.formData = {};
  }

  // Submit updated data
  onSubmit() {
    this.loader = true;
    this.http
      .put(Global.api(`game-status/${this.currentId}`), this.formData)
      .subscribe({
        next: (res) => {
          // ✅ Success Popup
          Swal.fire({
            title: 'Success!',
            text: 'Player status updated successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#3085d6',
          });
          this.loader = false;
          this.closePopup();
        },
        error: (err) => {
          console.error('Update failed:', err);
          this.loader = false;
        },
      });
  }
}
