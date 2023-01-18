import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import IUser from 'src/app/interfaces/IUser';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { PushService } from 'src/app/services/push.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy  {

  public users:Array<IUser> = []
  public usersOrigin:Array<IUser> = []
  public findName:string = ""
  public opensModal:boolean= false
  public idUser:string = ""
  public message:string = ""

  constructor(private usersService:UsersService, private pushService:PushService, private authorizationService: AuthorizationService, private router:Router){}
  ngOnDestroy(): void {
    alert("страница заблокирована")
  }

  ngOnInit(): void {
  this.authorizationService.Token$.subscribe(e=>{
      this.usersService.getUsers(e[0], e[1]).subscribe(
        es=>{console.log(es)
          this.users = es.passes
        this.usersOrigin = es.passes}
      )
    })
    setTimeout(()=>{
      if(this.users.length<1){
        this.router.navigate([''])
      }
    },5000)
  }
  
  closeModalWindow(){
    this.opensModal=!this.opensModal;
  }

  sendPush(){
    this.authorizationService.Token$.subscribe(e=>{
      this.pushService.push(e[0], e[1], this.idUser, this.message).subscribe(
        a=>console.log(a)
      )
    })
  }

  sortArrLastName(){
    function SortArray(x:IUser, y:IUser){
      return x.last_name.localeCompare(y.last_name);
    }
    this.users = this.users.sort(SortArray);
  }

  sortArrName(){
    function SortArray(x:IUser, y:IUser){
      return x.first_name.localeCompare(y.first_name);
    }
    this.users = this.users.sort(SortArray);
  }

  sortArrPutName(){
    function SortArray(x:IUser, y:IUser){
      return x.pat_name.localeCompare(y.pat_name);
    }
    this.users = this.users.sort(SortArray);
  }

  sortArrId(){
    this.users = this.users.sort((a:IUser, b:IUser) =>{
      return a.user_id - b.user_id;
    });
  }

  sortArrphone(){
    this.users = this.users.sort((a:IUser, b:IUser) =>{
      return Number(a.phone) -  Number(b.phone);
    });
  }
  sortArrBirthday(){
    this.users = this.users.sort((x:IUser, y:IUser)=>{
      return x.birthday.localeCompare(y.birthday);
    });
  }

  sortArrEmail(){
    this.users = this.users.sort((x:IUser, y:IUser)=>{
      return x.email.localeCompare(y.email);
    });
  }
  sortArrVisits(){
    this.users = this.users.sort((a:IUser, b:IUser) =>{
      return a.visits - b.visits;
    });
  }

  sortArrSumm(){
    this.users = this.users.sort((x:IUser, y:IUser) =>{
      return x.summ - y.summ;
    });
  }
  sortArrDiscount(){
    this.users = this.users.sort((x:IUser, y:IUser)=>{
      return x.discount - y.discount;
  })
  }

  findInArray(){
    if(this.findName != ""){
      this.users =  this.users.filter(a=>a.first_name.toLowerCase().includes(this.findName.toLowerCase()))
    }
    else {
      this.users = this.usersOrigin
    }
  }

}
