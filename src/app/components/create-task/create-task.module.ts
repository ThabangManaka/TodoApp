import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { CreateTaskComponent } from './create-task.component';
import { ColorSelectionComponent } from '../color-selection/color-selection.component';
import { IconSelectionComponent } from '../icon-selection/icon-selection.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
 
  ],
  declarations: [CreateTaskComponent,ColorSelectionComponent,IconSelectionComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CreateTaskModule {}
