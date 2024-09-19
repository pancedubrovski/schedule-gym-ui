import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { PlaceFilters } from '../models/place-filters';
import { CreatePlace } from '../models/create-place';



@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private http: HttpClient) { }

  public getPlaces(filters: any){

   


    const keys = Object.keys(filters).filter(k => filters[k] != null);
    let filter: any= {}
    keys.forEach(t => filter[t] = filters[t]);

    return this.http.get(`${environment.apiUrl}v1/schedule-gym/places`,{
      params: filter
    });
  }

  public getPalceById(id: string){
    return this.http.get(`${environment.apiUrl}v1/schedule-gym/places/${id}`);
  }
  
  public createPlace(form: FormData){
    const token = localStorage.getItem('token');
    return this.http.post(`${environment.apiUrl}v1/schedule-gym/places`,form);
  }
  public getFreeGym(filters: PlaceFilters){
    return this.http.get(`${environment.apiUrl}v1/schedule-gym/free-places`);
  }

  public delete(id: number){
    return this.http.delete(`${environment.apiUrl}v1/schedule-gym/places/${id}`);
  }
}
