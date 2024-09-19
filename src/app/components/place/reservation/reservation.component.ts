import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbDate, NgbDateStruct, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ScheduleService } from '../../../services/schedule.service';
import { Subject } from 'rxjs';

interface Appointment {
    id: number;
    date: string;
    startTime: string;
    endTime: string;
    placeId: number;
}

@Component({
    selector: 'reservation',
    templateUrl: './reservation.component.html',
    styleUrl: './reservation.component.scss'
})
export class RervationComponent implements OnInit {
    closeResult = '';

    public form!: FormGroup;
    public hours?: number;
    public totalPrice?: number;
    public successReservation?: string;

    @Input() placeId!: number;
    @Input() price!: number;
    @Input() place!: any;

    @Output() reservePlace = new EventEmitter<boolean>();


    constructor(private modalService: NgbModal, protected scheduleService: ScheduleService) { }

    public ngOnInit(): void {
        this.form = new FormGroup({
            date: new FormControl(null, Validators.required),
            startTime: new FormControl(null, Validators.required),
            endTime: new FormControl(null, Validators.required),
            description: new FormControl(null)
        });
        this.getFreeDates()
        this.form.controls['startTime'].valueChanges.subscribe(res => {
            this.calcPrice(res, this.form.controls['endTime'].value);
        });
        this.form.controls['endTime'].valueChanges.subscribe(res => {
            this.calcPrice(this.form.controls['startTime'].value, res);
        });
    }



    open(content: any) {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    }

    public reserve() {
       
        const date = this.getDate(this.form.controls['date']);
        const body = {
            date: date.toISOString(),
            startTime: this.getTimeString(date,this.form.controls['startTime'].value).toISOString(),
            endTime: this.getTimeString(date,this.form.controls['endTime'].value).toISOString(),
            placeId: this.placeId,
            userId: localStorage.getItem('ownerId'),
            description: this.form.controls['description'].value,
            totalPrice: this.totalPrice
        }

        this.scheduleService.scheduleGym(body).subscribe(res => {
            this.form.reset();
            this.modalService.dismissAll();
            this.reservePlace.emit(true);
            this.successReservation = 'You sucessfuly reserve the term';
        });
    }

    public calcPrice(startTime: any, endTime: any) {

        if (startTime != null && endTime != null) {
            let diff = this.getTimeString(new Date(),endTime).getTime() - this.getTimeString(new Date,startTime).getTime();
            this.hours = +((diff / 60000) / 60).toFixed(2);
            this.totalPrice = this.hours * this.price;
        }
    }

    private getTimeString(date: Date,time: any): Date {
        date.setHours(time.hour);
        date.setMinutes(time.minute);

       
        return date;
    }

    private getDate(date: any): Date {

        const newDate = new Date();
        newDate.setFullYear(date.value.year);
        newDate.setDate(date.value.day);
        newDate.setMonth(date.value.month - 1);
        return newDate;
    }

    public disabledDates!: Array<NgbDate>;
    public getFreeDates() {
        this.disabledDates = [];
        (this.place?.appointments as []).forEach((a: Appointment) => {
            const date = new Date(a.date)

            this.disabledDates.push();
        });

       
    }

    public isDisabled = (date: NgbDate) =>  {
      
        return this.place?.appointments.map((a: any) => a.date).filter((d1: string) => {
          
            let dateArr: string[] = d1.split('-');
            let y: number = parseInt(dateArr[0]);
            let m:number = parseInt(dateArr[1]);
            let d:number = parseInt(dateArr[2]);
            return date.year == y && date.month == m && date.day == d;  
            }).length == 0
        };


}