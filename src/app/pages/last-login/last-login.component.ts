import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Global } from 'src/app/base/services/global';

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
  styleUrls: ['./last-login.component.scss']
})
export class LastLoginComponent implements OnInit {
  playerId!: number;
  photos: PlayerPhoto[] = [];
  loading = false;
  errorMessage = '';
  currentPage = 1;
  lastPage = 1;
  perPage = 12; // ✅ Default per page

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.playerId = +id;
        this.fetchPlayerPhotos(this.currentPage);
      } else {
        this.errorMessage = 'Invalid player ID';
      }
    });
  }

  fetchPlayerPhotos(page: number) {
    this.loading = true;

    const url = Global.api(`player-photo-validation/${this.playerId}?page=${page}&per_page=${this.perPage}`);

    this.http.get<{ status: string; data: PlayerPhoto[]; pagination?: any }>(url)
      .subscribe({
        next: (res) => {
          console.log('Response:', res);
          if (res.status === 'OK') {
            this.photos = res.data;
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
        }
      });
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.lastPage) {
      this.currentPage = page;
      this.fetchPlayerPhotos(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  downloadPhoto(url: string) {
  fetch(url)
    .then(response => response.blob())
    .then(blob => {
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = url.split('/').pop() || 'photo.jpg';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(blobUrl);
    })
    .catch(err => console.error('Download failed:', err));
}

}
