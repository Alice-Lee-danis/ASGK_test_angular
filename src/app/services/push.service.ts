import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor(private httpPush: HttpClient) { }

  push(apikey:string, token:string, id:string, message:string){
    return this.httpPush.post<any>(` https://api.asgk-group.ru/v1/${token}/message/push`,{
      "user_id": id,
      "date_start": "2023-12-31T10:00:00.000Z",
      "push_message": message
    } , {
      headers: new HttpHeaders(
        {
        "Content-Type":"application/json",
        "Authorization" : apikey
      })
      
      
    })
  }
}
