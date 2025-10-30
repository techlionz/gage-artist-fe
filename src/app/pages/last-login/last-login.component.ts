import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Global } from 'src/app/base/services/global';
import Swal from 'sweetalert2';

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
  nickname: string = '';
  photos: PlayerPhoto[] = [];
  loading = false;
  errorMessage = '';
  currentPage = 1;
  lastPage = 1;
  perPage = 24; // ✅ Default per page

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
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

  fetchPlayerPhotos(page: number) {
    this.loading = true;

    const url = Global.api(`player-photo-validation/${this.playerId}?page=${page}&per_page=${this.perPage}`);

    this.http.get<{ status: string; data: PlayerPhoto[]; pagination?: any }>(url)
      .subscribe({
        next: (res) => {
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
  fetch(url, { mode: 'cors' })
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      return response.blob();
    })
    .then(blob => {
      const a = document.createElement('a');
      const blobUrl = window.URL.createObjectURL(blob);
      a.href = blobUrl;
      a.download = url.split('/').pop() || 'photo.png';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(blobUrl);
      Swal.fire({
        icon: 'success',
        title: 'Downloaded!',
        text: 'Your photo has been downloaded successfully.',
        timer: 2000,
        showConfirmButton: false
      });
    })
    .catch(err => console.error('Download failed:', err));
}


}