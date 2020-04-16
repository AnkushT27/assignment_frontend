import { Component,} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {AppServiceService} from './app-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-assignment';
  emailRegex: any = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
  addUserForm: FormGroup;
  selectedId:any;
  users:any = [];
  editFlag:boolean = false;
  constructor(private service:AppServiceService) { 
    this.addUserForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required,Validators.pattern(this.emailRegex)]),
    });
    this.getUsers();
  }


  getUsers(){
     this.service.getUsers().subscribe((res:any)=>{
        this.users = res;
     })
  }

  saveUser(){
    this.service.addUser(this.addUserForm.value).subscribe((res:any)=>{
       if(res){
         this.getUsers();
         this.addUserForm.reset();
       }
    })
  }

  updateUser(id:number){
   this.service.updateUser(this.selectedId,this.addUserForm.value).subscribe((res:any)=>{
      if(res){
        this.getUsers();
        this.addUserForm.reset();
        this.editFlag = false;
      }
   })
    
  }

  getUserByID(id){
    this.service.getUserById(id).subscribe((res:any)=>{
      console.log('my Response',res);
      if(res){
        this.addUserForm.controls['name'].setValue( res.name) 
        this.addUserForm.controls['email'].setValue( res.email) 
        this.editFlag =true;
        this.selectedId= id;
      }
   })
  }

}
