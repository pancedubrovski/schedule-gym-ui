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
  public images: string[] = [];
  public place: any;

  public isLoaded = false;
  public reviewForm!: FormGroup;
  public successReservation: boolean = false;

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

      (res as any)?.photos.forEach((p: any) => {
        const retrieveResonse = p.bytes;
        const extension = p.fileExtension.slice(1);
        this.images.push('data:image/' + extension + ';base64,' + retrieveResonse);
      });
      this.isLoaded = true;
    })
  }

  public retrievedImage: any;

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
  public onReserve(event: any) {
    this.successReservation = true;
  }

}
