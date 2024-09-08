import { Component, Input, OnInit } from '@angular/core';
import { PlaceService } from '../../services/place.service';
import { PlaceFilters } from '../../models/place-filters';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrl: './place-list.component.scss'
})
export class PlaceListComponent implements OnInit {
  public places: any = [];
  @Input() filters?: PlaceFilters;
  public pageSize = 10;
  public collectionSize = 10;
  public page = 1;

  constructor(protected placeSerivce: PlaceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  public ngOnInit(){

    
    if(this.filters == null){
      this.filters = {} as PlaceFilters;
    }
    this.route.queryParams.subscribe(params => {
      this.filters!.city = params['city'] ?? null;
      this.filters!.startTime = params['startTime'] ?? null;
      this.filters!.endTime = params['endTime'] ?? null;
      this.filters!.date = params['date'] ?? null;
      this.filters!.kind = params['kind'] ?? null;
      this.filters!.getFreeGyms = params['getFreeGyms'] ?? false;

  });
    this.refreshPlaces();
 
  }


  public refreshPlaces(){

    this.filters!.page = this.page;
    this.filters!.pageSize =this.pageSize;
    this.placeSerivce.getPlaces(this.filters!).subscribe((placesResponse: any) => {
      this.places = placesResponse?.items;
    });
  }
  public openPlace(id: number){
    this.router.navigate([`place/${id}`]);
  }
}

