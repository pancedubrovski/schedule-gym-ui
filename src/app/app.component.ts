import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(private userService: UserService) { }

  public isAuthenticated = false;
  public role!: string;

  ngOnInit(): void {
    
    this.userService.isAuthenticated$.subscribe((isAuthenticated: any) => {
      this.isAuthenticated = isAuthenticated;
      if(isAuthenticated) {
        this.role = localStorage.getItem('role')!;
      }
    });
  }
  public logout(){
    this.userService.logout().subscribe( () => {

    });
  }
}
