import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee, faUsers, faDashboard } from '@fortawesome/free-solid-svg-icons';
import { StandardService } from '../../core/services/http-standar.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {
  @Input() collapsed = false;
  faCoffee = faCoffee;
  faUsers = faUsers;
  faDashboard = faDashboard;

  constructor(private http: StandardService<any>) {
    this.http.setConfig({
      url: '/navegacion',
    });
  }

  ngOnInit() {
    this.http.getAll().subscribe((res) => {
      console.log('Navegación:', res);
    });
  }
}
