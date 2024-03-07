import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, FormBuilder } from '@angular/forms';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent implements OnInit   {

  priority = ['High','Medium','Low'];
  currentDate : string;
  selectedColor : string;
  selectedIcon : string;

  todoForm = new FormGroup({
    Title: new FormControl(''),
    Description: new FormControl(''),
    Priority: new FormControl(''),
    setDate: new FormControl(new Date().toISOString()),
    startTime: new FormControl(new Date().toISOString()),
    endTime: new FormControl(new Date().toISOString()),
    Color: new FormControl(''),
   Icon: new FormControl(''),
  })


   myForm: FormGroup;
  constructor(private modalCtrl: ModalController,
    private toastCtrl : ToastController,
    private todoService : TodoService,
    private navParams : NavParams,
    private formBuilder : FormBuilder
    ) { }


ngOnInit() {
const formData = this.navParams.get('data');


if(formData){
  this.myForm = this.formBuilder.group({
    setDate: [new Date(formData.value.setDate).toISOString()],
    startTime: [new Date(formData.value.startTime).toISOString()],
    endTime: [new Date(formData.value.endTime).toISOString()],
    Title: [formData.value.Title],
    Priority: [formData.value.Priority],
    Description: [formData.value.Description],
    Icon: [formData.value.Icon],
    Color: [formData.value.Color],
  
  })
  
}else {
  this.myForm =  this.formBuilder.group({
    setDate: [new Date().toISOString()],
    startTime: [new Date().toISOString()],
    endTime: [new Date().toISOString()],
  Title: [''],
  Priority: [''],
  Description: [''],
  Icon: [''],
  Color:[''],
  TaskStatus:['']
  })
}

}
  dismissModal(){
    this.modalCtrl.dismiss();
  
  }
  async presentToast(msg : string){

    const toast = await this.toastCtrl.create({
      message : msg,
      duration: 2000,
      buttons  : [{
  
        side: 'end',
        icon: 'checkmark-circle-outline',
        role: 'cancel'
      }
      ]
    });
    toast.present();
  }

  onSubmit(){

    const formData = this.navParams.get('data');

    if(formData && formData.key) {
      this.myForm.value.Color = this.selectedColor;
      this.myForm.value.Icon = this.selectedIcon;
      this.todoService.addTask(formData.key,this.myForm.value).then(data => {
        this.presentToast("Task Updated Succesfully!");
        this.modalCtrl.dismiss();
      })
    }else {
      this.currentDate = (new Date()).toISOString();
      let uid = this.currentDate + this.myForm.value.Title;
      this.myForm.value.Color = this.selectedColor;
      this.myForm.value.Icon = this.selectedIcon;
      this.todoService.addTask(uid,this.myForm.value).then(data =>{
       console.log(data)
     
       this.presentToast("Task Added Succesfully!");
     
       this.modalCtrl.dismiss();
      })
    
    }
   

  }


  onColorSelected(color : string){
   this.selectedColor = color;

  }
  onIconSelected(icon: string) {

    this.selectedIcon = icon;
  }
}
