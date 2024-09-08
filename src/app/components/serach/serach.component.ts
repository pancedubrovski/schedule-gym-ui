import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Params, Router } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'serach',
  templateUrl: './serach.component.html',
  styleUrl: './serach.component.scss'
})
export class SerachComponent implements OnInit {

  public searchForm!: FormGroup;
	public model?: NgbDateStruct;
  time = { hour: 13, minute: 30 };
  public serachFormControl: FormControl = new FormControl();
  public endTime: FormControl = new FormControl();
  searching = false;
  searchFailed = false;

  constructor(private router: Router){}

   public ngOnInit(): void {
    this.searchForm = new FormGroup({
      city: new FormControl(''),
      date: new FormControl(new Date()),
      startTime: new FormControl(''),
      endTime: new FormControl(''),
      kind: new FormControl('')
    })
  }

  formatter = (x: { id: number, title: string }) => {
    if (x.id) {
      return `${x.title}`;
    }
    return '';
  }
  search() {
   
    const queryParams: Params = {city: this.searchForm.controls['city']?.value,
      startTime: this.getTimeString(this.searchForm.controls['startTime']),
       endTime: this.getTimeString(this.searchForm.controls['endTime']),
       date: new Date(this.searchForm.controls['date'].value).toISOString(),
       kind: this.searchForm.controls['kind']?.value,
       getFreeGyms: true
      };


   


    this.router.navigate(['/places'],{queryParams});
  
 
  }

  private getTimeString(time: any): string{
    const date = new Date(this.searchForm.controls['date'].value);
   
    date.setHours(time.value.hour);
    date.setMinutes(time.value.minute);
    return date.toISOString();
  }
}
