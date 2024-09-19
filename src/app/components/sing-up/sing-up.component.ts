import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-sing-up',
    templateUrl: './sing-up.component.html',
    styleUrl: './sing-up.component.scss'
  })
  export class SignUpComponent implements OnInit {

    public formGroup!: FormGroup;
    public errorMessage?: string;

    constructor(protected userService: UserService,private router: Router){}


    ngOnInit(): void {

        this.formGroup = new FormGroup({
            username: new FormControl(null,Validators.required),
            password: new FormControl(null,Validators.required),
            confirmPassword: new FormControl(null,Validators.required),
            email: new FormControl(null,[Validators.required,Validators.email]),
            firstName: new FormControl(null,Validators.required),
            lastName: new FormControl(null,Validators.required),
            phoneNumber: new FormControl(null,Validators.required),
            role: new FormControl(null,Validators.required)
        })
    }

    public singUp(){
     
        const body = {
            username: this.formGroup.controls['username']?.value,
            password: this.formGroup.controls['password']?.value,
            email: this.formGroup.controls['email'].value,
            fullName: this.formGroup.controls['firstName']?.value+ ' '
            + this.formGroup.controls['lastName']?.value,
            phoneNumber: this.formGroup.controls['phoneNumber']?.value,
            role: this.formGroup.controls['role']?.value,
        }
        this.userService.register(body).subscribe((res: any) => {
            
            this.userService.setDataToSession(res?.token);
            this.router.navigate(['/home']);
        })
    }

  }