import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../../services/place.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ScheduleService } from '../../services/schedule.service';


@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrl: './place.component.scss'
})
export class PlaceComponent implements OnInit {

  public placeId!: any;
  public images = ['https://img.freepik.com/free-photo/3d-gym-equipment_23-2151114163.jpg',
    'https://www.shutterstock.com/image-photo/modern-light-gym-sports-equipment-260nw-721723381.jpg'];
  public place: any;

  public isLoaded = false;
  public reviewForm!: FormGroup;

  constructor(protected placeService: PlaceService,
    protected scheduleService: ScheduleService,
    private route: ActivatedRoute) { }

  public ngOnInit() {
    this.reviewForm = new FormGroup({
      comment: new FormControl(null, Validators.required),
      rating: new FormControl(null, Validators.required)
    });
    this.placeId = this.route.snapshot.paramMap.get('placeId');
    this.placeService.getPalceById(this.placeId!).subscribe(res => {
     
      this.place = res;
      this.isLoaded = true;
    })
  }

  public addReview() {
    const body = {
      'comment': this.reviewForm.controls?.['comment'].value,
      "numberOfStars": this.reviewForm.controls?.['rating'].value,
      "date": new Date().toISOString(),
      "placeId": this.placeId,
      "userId": localStorage.getItem('ownerId')
    }
    this.scheduleService.addReview(body).subscribe(res => {
      this.reviewForm.reset();
      this.place.reviewes.push(res);
    });

  }
}
