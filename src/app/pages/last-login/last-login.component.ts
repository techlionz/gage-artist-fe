import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Global } from 'src/app/base/services/global';
import Swal from 'sweetalert2';

// Define the structure of the Photo object for type safety
interface PlayerPhoto {
  id: number;
  player_id: number;
  photo: string;
  created_at: string;
  updated_at: string;
}

@Component({
  selector: 'app-last-login',
  templateUrl: './last-login.component.html',
  styleUrls: ['./last-login.component.scss'],
})
export class LastLoginComponent implements OnInit {
  // State properties
  playerId!: number;
  nickname: string = '';
  photos: PlayerPhoto[] = [];
  loading = false;

  // Pagination properties
  errorMessage = '';
  currentPage = 1;
  lastPage = 1;
  perPage = 24; //  Default per page

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute, // Used to extract URL parameters
  ) {}

  ngOnInit(): void {
    /**
     * Subscribe to paramMap to listen for changes in the URL.
     * Extracts 'id' and 'nickname' from the route (e.g., /photos/:id/:nickname)
     */
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      const nickname = params.get('nickname');
      if (id) {
        this.playerId = +id;
        this.nickname = nickname || '';
        this.fetchPlayerPhotos(this.currentPage);
      } else {
        this.errorMessage = 'Invalid player ID';
      }
    });
  }

  /**
   * Fetches photos from the API based on the current page and player ID.
   */

  fetchPlayerPhotos(page: number) {
    this.loading = true;

    // Constructs the API URL using a Global helper
    const url = Global.api(
      `player-photo-validation/${this.playerId}?page=${page}&per_page=${this.perPage}`,
    );

    this.http
      .get<{ status: string; data: PlayerPhoto[]; pagination?: any }>(url)
      .subscribe({
        next: (res) => {
          if (res.status === 'OK') {
            this.photos = res.data;
            // Update pagination state if the backend provides it
            if (res.pagination) {
              this.currentPage = res.pagination.current_page;
              this.lastPage = res.pagination.last_page;
              this.perPage = res.pagination.per_page;
            }
          }
          this.loading = false;
        },
        error: () => {
          this.errorMessage = 'Failed to load player photos.';
          this.loading = false;
        },
      });
  }

  /**
   * Handles page switching and scrolls the user back to the top.
   */

  changePage(page: number) {
    if (page >= 1 && page <= this.lastPage) {
      this.currentPage = page;
      this.fetchPlayerPhotos(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  /**
   * Downloads a photo by fetching it as a Blob.
   * This method bypasses browser "open in new tab" behavior for images.
   */

  downloadPhoto(url: string) {
    // Fetch image with CORS mode to allow blob conversion
    fetch(url, { mode: 'cors' })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        return response.blob();
      })
      .then((blob) => {
        // Create a temporary anchor element to trigger the download
        const a = document.createElement('a');
        const blobUrl = window.URL.createObjectURL(blob);
        a.href = blobUrl;
        // Use the filename from the URL or default to photo.png
        a.download = url.split('/').pop() || 'photo.png';
        document.body.appendChild(a);
        a.click();
        // Clean up: remove element and revoke the temporary URL
        a.remove();
        window.URL.revokeObjectURL(blobUrl);
        // Success notification
        Swal.fire({
          icon: 'success',
          title: 'Downloaded!',
          text: 'Your photo has been downloaded successfully.',
          timer: 2000,
          showConfirmButton: false,
        });
      })
      .catch((err) => console.error('Download failed:', err));
  }
}
