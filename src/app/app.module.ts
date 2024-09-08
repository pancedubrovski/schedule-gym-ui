import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbPaginationModule, NgbAlertModule, NgbDatepickerModule, NgbTimepickerModule, NgbModule, NgbDate, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SerachComponent } from './components/serach/serach.component';
import { LoginComponent } from './components/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PlaceComponent } from './components/place/place.component';
import { PlaceListComponent } from './components/place-list/place-list.component';
import { CreateGymComponent } from './components/create-gym/create-gym.component';
import { CommonModule } from '@angular/common';
import { JwtInterceptor } from './interceptors/JwtInterceptor';
import { RervationComponent } from './components/place/reservation/reservation.component';
import { SignUpComponent } from './components/sing-up/sing-up.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';



@NgModule({
  declarations: [
    AppComponent,
    SerachComponent,
    LoginComponent,
    PlaceComponent,
    PlaceListComponent,
    CreateGymComponent,
    RervationComponent,
    SignUpComponent,
    ReservationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgbDatepickerModule,
    FormsModule,
    NgbTimepickerModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    NgbRatingModule,
    CanvasJSAngularChartsModule
  ],
  providers: [
    provideClientHydration(),
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
