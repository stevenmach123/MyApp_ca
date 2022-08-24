import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from '../calendar/calendar.component';
import { HomePage } from './home.page';
import {Service1} from "../service1";
const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      
    ]
  },
  {path:'calendar', component:CalendarComponent}
 
];

@NgModule({
  imports: [

    RouterModule.forChild(routes)],
  exports: [RouterModule],
 
})
export class HomePageRoutingModule {}
