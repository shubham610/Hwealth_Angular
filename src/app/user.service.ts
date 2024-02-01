import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private user={
    userId:null,
    userName:null,
    userPhoneNo:null
  }

setUser(formData:any){
this.user.userId=formData.userId;
this.user.userName=formData.userName;
this.user.userPhoneNo=formData.userPhoneNo;
}

getUser(){
  return this.user;
}
}