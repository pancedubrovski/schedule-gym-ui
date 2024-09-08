import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../../services/place.service';
import { CreatePlace } from '../../models/create-place';
import { FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-gym',
  templateUrl: './create-gym.component.html',
  styleUrl: './create-gym.component.scss'
})
export class CreateGymComponent implements OnInit {

  public form!: FormGroup;
  constructor(protected placeService: PlaceService,private router: Router){}

  public ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('',Validators.required),
      kind: new FormControl('',Validators.required),
      city: new FormControl('',Validators.required),
      multiplicity:new FormControl('',Validators.required),
      address: new FormControl('',Validators.required),
      capacity: new FormControl('',Validators.required),
      description: new FormControl('',Validators.required),
      price: new FormControl(null,Validators.required)
    });
  }
  public body?: CreatePlace;
  public createPlace(){

    this.body = {
      name: String(this.form.controls['name']?.value),
      placeKind: String(this.form.controls['kind']?.value),
      city: String(this.form.controls['city']?.value),
      price: this.form.controls['price'].value,
      multiplicity: String(this.form.controls['multiplicity']?.value),
      address: String(this.form.controls['address'].value),
      capacity: Number(this.form.controls['capacity'].value),
      description: this.form.controls['description'].value,
      ownerId: String(localStorage.getItem("ownerId"))
    }
    this.placeService.createPlace(this.body).subscribe(res =>{
      this.router.navigate([`places`]);
    });
  }
}
