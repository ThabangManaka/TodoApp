import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
})
export class TaskViewComponent   {

    taskData : any;
  constructor(private navParams : NavParams, 
    private modalCtrl :ModalController) { 
      this.taskData = this.navParams.data;
    }

    dismissModal(){
      this.modalCtrl.dismiss();
    }
    onMissed(){

    }

    onDelete(){

    }
}
