import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';


import { CalendarComponent } from '../calendar/calendar.component';
import { HomePageRoutingModule } from './home-routing.module';
import {FoodComponent} from '../food/food.component';
import {Service1} from "../service1"

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePage,
    CalendarComponent,
    FoodComponent
  ],
  providers:[Service1],

  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class HomePageModule {}
