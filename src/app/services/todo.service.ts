import { Injectable, resolveForwardRef } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  tasksChanged = new Subject<void>(); 
  
  constructor(private storage : Storage) { 
   this.init();
  }
async init() {
  const storage = await this.storage.create();
}


addTask(key:any, value: any){
  
  return this.storage.set(key,value)
} 


getAllTask() {
  let tasks: any =[];
  var promise = new Promise((resolve, reject)=> {
    this.storage.forEach((value, key,index) => {
      tasks.push({'key':key,'value':value});
    }).then((d) => {
      resolve(tasks);
    });
  });

  return promise;
}
getTaskById(key:string){
  let item = this.storage.get(key);

  return item;
}

async deleteTask(key: string){

  return await this.storage.remove(key)
}
}