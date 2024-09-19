import { afterNextRender, AfterRenderPhase, Component, ViewChild } from '@angular/core';
import { PlaceService } from '../../services/place.service';
import { ScheduleService } from '../../services/schedule.service';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ChartComponent
} from "ng-apexcharts";


export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.scss'
})
export class ReservationsComponent {



  public reservations: any = [];
  public groupByPlace: any = [];
  public role!: string;

  public chartOptions?: any;
  
  constructor(protected scheduleService: ScheduleService) {
  }
  public ngOnInit(){
    const userId = String(localStorage.getItem("ownerId"));
    this.role = localStorage.getItem('role')!;
    let filteres: any = {
      userId
    };
    if(this.role != 'Customer'){
      filteres.myPlaces = true
    }


    this.scheduleService.retriveSchedules(filteres).subscribe((res: any) => {
    
      this.reservations = res;
      const places = this.reservations.map((a: any) => a.place.name)
      .filter((item: any, i: any, ar: any) => ar.indexOf(item) === i);

   
      this.groupByPlace = [];
      places.forEach((p: any) => {
        const total = this.reservations.filter((r: any) => r?.place.name == p)
        .reduce((a: number, c: any) => a+c.totalPrice,0);
        this.groupByPlace.push({name: p,y: total});
      });
      
     
      this.chartOptions = {
        animationEnabled: true,
        theme: "dark2",
        exportEnabled: true,
        title: {
          text: "Total earn by gym"
        },
        subtitles: [{
          text: ""
        }],
        data: [{
          type: "pie", 
          indexLabel: "{name}: {y} EUR",
          dataPoints: this.groupByPlace
        }]
      }
    });
  }
 
}
