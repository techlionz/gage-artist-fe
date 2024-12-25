import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ListControllerComponent } from 'src/app/base/components/list-controller.component';
import { Global } from 'src/app/base/services/global';
import { HttpxService } from 'src/app/base/services/httpx.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends ListControllerComponent implements OnInit {

  public records: any;
  public addCompanyUrl: string = 'affiliate-transactions/add';
  public pageOptions = Global.pageOptions();
  public msgModal: any;
  public error_message = "" ;
  public success_message = "" ;
  allImageFiles: { [key: string]: File[] } = {}; // Map to store files with keys as unique identifiers

  public commonError: string = "";

  constructor(
    private httpx: HttpxService,
    private dialog: MatDialog,
    private location: Location,
    private http: HttpClient
  ) {
    super(location, httpx);
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
  onImagesUploaded(player_id: string, id: string, images: File[]) {
    this.imageStatus[player_id] = true ;
    const key = `${player_id}_${id}`; // Unique key for storing files
    this.allImageFiles[key] = images; // Store files under the specific key
  }

  // Save all images via an AJAX request
  saveImages(player_id: string) {
    if (Object.keys(this.allImageFiles).length === 0) {
      alert('No images selected for upload!');
      return;
    }

    const formData = new FormData();
    formData.append('player_id', player_id);

    for (const key in this.allImageFiles) {
      this.allImageFiles[key].forEach((file, index) => {
        formData.append(`images[${key}]`, file, file.name);
      });
    }

    this.http.post(Global.api(Global.API_ARTIST_REQUEST), formData)
      .pipe(
        catchError(error => {
          console.error('Upload failed', error);
          this.error_message = 'Failed to save the avatar image.' ;
          return of(null);
        })
      )
      .subscribe(response => {
        if (response) {
          this.success_message = 'Avatar images saved successfully.' ;
          this.imageStatus[player_id] = false
          this.refreshList(this.pageOptions.pageEvents);
        }
      });
  }
}
