import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  public form!: FormGroup;
  public errorMessage?: string;
  constructor(protected userService: UserService,private router: Router){}

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl('')
    });
  }


  public loginUser(){
    const body  = {
      username: this.form.controls['username'].value,
      password: this.form.controls['password'].value
    }
   
    this.userService.login(body).subscribe((token) => {
     this.userService.setDataToSession(token);
      this.router.navigate(['/home']);
    },error => {
      console.log('error',error);
      this.errorMessage = error.error;
    });
  }
}
