import { Component } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { CreateTaskComponent } from '../components/create-task/create-task.component';
import { TodoService } from '../services/todo.service';
import { DatePipe } from '@angular/common';
import { TaskViewComponent } from '../components/task-view/task-view.component';




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  todoList: any;
  constructor(private modalCtrl : ModalController,
    private todoService : TodoService,
    private loadingCtrl : LoadingController,
    private datePipe : DatePipe
  ) {
   this. loadData();
  }


  loadData() {
    this.presentingLoading().then(() => {
      this.todoService.getAllTask().then((val) =>{

        this.todoList = val;
            console.log(val);
        this.loadingCtrl.dismiss();
      });
    })
  
  }
 
 async presentingLoading() {

  const loading = await this.loadingCtrl.create({
    message: "Please Wait..",
  })
  await loading.present();
 }

  convertDateTimeToTime(dateTimeValue :any):string {
    if(dateTimeValue !== null) {
  
    return this.datePipe.transform(dateTimeValue, 'hh.mm')|| '';
    }
  
    return '';
  }
    calculateTimeDifference(startDateTime:string, endDateTime: string) :string {
      const startDate = new Date(startDateTime);
      const endDate = new Date(endDateTime);

      if(isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {

        return 'Invalid date format';
      }

      const timeDifferenceMs =endDate.getTime() - startDate.getTime()

      const hours = Math.floor(timeDifferenceMs / (1000 * 60 *60));
      const minutes = Math.floor(timeDifferenceMs % (1000 * 60  * 60)) /(1000 *60);
    
        if (hours > 0){
          return `${hours}hr`;

        }
        else if(minutes > 0){
          return `${minutes}min`;
        }
        else {
          return '0 min';
        }


    }
    async  presentModal(data :any){
      const modal = await this.modalCtrl.create({
        component: TaskViewComponent,
        showBackdrop: true,
        backdropDismiss: true,
        animated: true,
      initialBreakpoint:0.45,
      // breakpoints:[0.25, 0.5, 0.45],
      //breakpoints: [0.25, 0, 0, 0],
        mode: 'ios',
        keyboardClose: true,
        componentProps: { data
  
        },
        cssClass: "taskViewmodal"
      })
        
      modal.onDidDismiss().then((data) =>{
        if(data && data.data && data.data.deleted){
          this.loadData();
        }
      })
    
      return await modal.present();
    }
    
  async addTask(){

    const modal = await this.modalCtrl.create({
      component: CreateTaskComponent,
      showBackdrop: true,
      backdropDismiss: true,
      animated: true,

    })

    return await modal.present()
  }
}
