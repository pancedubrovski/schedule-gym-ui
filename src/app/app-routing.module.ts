import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SerachComponent } from './components/serach/serach.component';
import { CreateGymComponent } from './components/create-gym/create-gym.component';
import { PlaceListComponent } from './components/place-list/place-list.component';
import { PlaceComponent } from './components/place/place.component';
import { SignUpComponent } from './components/sing-up/sing-up.component';
import { ReservationsComponent } from './components/reservations/reservations.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'home', component: SerachComponent },
  { path: 'new-gym', component: CreateGymComponent },
  { path: 'places', component: PlaceListComponent },
  { path: 'place/:placeId', component: PlaceComponent },
  { path: 'reservations', component: ReservationsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
