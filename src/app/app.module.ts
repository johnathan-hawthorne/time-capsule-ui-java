import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { AppComponent } from './app.component';
import { TaskStopwatchComponent } from './task-stopwatch/task-stopwatch.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { TaskSchedulerComponent } from './task-scheduler/task-scheduler.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';



@NgModule({
  declarations: [
    AppComponent,
    TaskStopwatchComponent,
    NavMenuComponent,
    HomeComponent,
    TaskSchedulerComponent
  ],
  imports: [
    BrowserModule,
    NgxMaterialTimepickerModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'task-stopwatch', component: TaskStopwatchComponent },
      { path: 'task-scheduler', component: TaskSchedulerComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
