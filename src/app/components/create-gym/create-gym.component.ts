import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../../services/place.service';
import { CreatePlace } from '../../models/create-place';
import { FormControl, FormGroup, FormBuilder , Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-gym',
  templateUrl: './create-gym.component.html',
  styleUrl: './create-gym.component.scss'
})
export class CreateGymComponent implements OnInit {

  public form!: FormGroup;
  public formData = new FormData();
  public file: any;
  public imageUrl: any;
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
      price: new FormControl(null,Validators.required),
      image: new FormControl(null)
    });
  }
  public body?: CreatePlace;
  public createPlace(){
    const formData = new FormData();
    formData.append("image", this.file!, this.file!.name);

    const form = new FormData();

      form.append('name', String(this.form.controls['name']?.value));
      form.append('placeKind', String(this.form.controls['kind']?.value));
      form.append('city', String(this.form.controls['city']?.value));
      form.append('price', this.form.controls['price'].value);
      form.append('multiplicity', String(this.form.controls['multiplicity']?.value));
      form.append('address', String(this.form.controls['address'].value));
      form.append('capacity', (this.form.controls['capacity'].value));
      form.append('description', this.form.controls['description'].value);
      form.append('ownerId', String(localStorage.getItem("ownerId")));
      form.append('photos',this.file);

    this.placeService.createPlace(form).subscribe(res =>{
      this.router.navigate([`places`]);
    });
  }
//IFormFileCollection
  public handleDragOver(event: any) {

  }

  public handleDrop(event: any){}

 
  uploadImage(event:any){
    this.file = event.target.files[0];
    

    const reader = new FileReader();
    //this.imagePath = files;
    reader.readAsDataURL(this.file); 
    reader.onload = (_event) => { 
        this.imageUrl = reader.result;
    }

  
  }
}
