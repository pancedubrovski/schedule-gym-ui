import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Params, Router } from '@angular/router';

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

  constructor(private router: Router) { }

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
    const d = this.searchForm.controls['date'].value;
    const date = new Date(+d.year, +d.month - 1, +d.day);
    const queryParams: Params = {
      city: this.searchForm.controls['city']?.value,
      startTime: this.getTimeString(date, this.searchForm.controls['startTime']),
      endTime: this.getTimeString(date, this.searchForm.controls['endTime']),
      date: date.toISOString(),
      kind: this.searchForm.controls['kind']?.value,
      getFreeGyms: true
    };

    this.router.navigate(['/places'], { queryParams });
  }

  private getTimeString(date: Date, time: any): string {
    date.setHours(time.value.hour);
    date.setMinutes(time.value.minute);
    return date.toLocaleTimeString();
  }
}
