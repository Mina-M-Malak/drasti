import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassDetailsRoutingModule } from './class-details-routing.module';
import { ClassDetailsComponent } from './components/class-details/class-details.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ClassDetailsComponent
  ],
  imports: [
    CommonModule,
    ClassDetailsRoutingModule,
    AccordionModule.forRoot(),
    SharedModule
  ]
})
export class ClassDetailsModule { }
