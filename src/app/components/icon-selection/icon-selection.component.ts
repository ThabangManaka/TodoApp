import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-icon-selection',
  templateUrl: './icon-selection.component.html',
  styleUrls: ['./icon-selection.component.scss'],
})
export class IconSelectionComponent   {
  @Output() iconSelected = new EventEmitter<string>();
  icons: string[] = [
    'alarm-outline', 'basketball', 'pizza-outline', 'cart-outline', 'desktop-outline', 'barbell-outline',
  ];
  selectedIcon: string;
  constructor() { }

  selectIcon(icon: string) {

    this.selectedIcon = icon;
    this.iconSelected.emit(icon);
  }

}
