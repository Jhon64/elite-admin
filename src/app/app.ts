import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './layouts/sidebar/sidebar';
import { Header } from './layouts/header/header';
import { Footer } from './layouts/footer/footer';
import { HttpClient } from '@angular/common/http';
import { GlobalFunction } from './common/global-function';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  collapsed = false;

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.loadPubliKey();
  }

  loadPubliKey() {
    this.http.get('/security/public-key').subscribe({

      next: (response:any) => {
        console.log('Public key loaded successfully:', response);
        GlobalFunction.setPublicKey(response.data.publicKey);
      },
      error: (error) => {
        console.error('Error loading public key:', error);
      },
    });
  }

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }
}
