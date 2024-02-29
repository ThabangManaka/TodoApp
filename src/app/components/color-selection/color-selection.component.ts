import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-color-selection',
  templateUrl: './color-selection.component.html',
  styleUrls: ['./color-selection.component.scss'],
})
export class ColorSelectionComponent   {
  @Output() colorSelected =  new EventEmitter<string>();
  colors: string[] = ['#FFD480', '#D1FFBD', '#ADDFFF',' #FFD1DF',' #FFA500','#CCCCFF'];
  selectedColor: string ;
  constructor() { }

selectColor(color: string) {
this.selectedColor = color;
this.colorSelected.emit(this.selectedColor);
}

}
