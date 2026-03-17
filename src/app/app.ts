import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './layouts/sidebar/sidebar';
import { Header } from './layouts/header/header';
import { Footer } from './layouts/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Sidebar,Header,Footer,],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
 collapsed = false;

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }
}
