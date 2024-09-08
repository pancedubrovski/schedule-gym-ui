import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient) { }

  public retriveSchedules(filters: any){
    const keys = Object.keys(filters).filter(k => filters[k] != null);
    let filter: any= {}
    keys.forEach(t => filter[t] = filters[t]);
    return this.http.get(`${environment.apiUrl}v1/schedule-gym/schedules`,{
      params: filter
    });
  }
  public scheduleGym(body: any){
    return this.http.post(`${environment.apiUrl}v1/schedule-gym/schedule`,body);
  }

  public addReview(body: any){
    return this.http.post(`${environment.apiUrl}v1/schedule-gym/review`,body);

  }

}
