import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get(`${environment.baseURL}/users`)
  }

  addUser(payload){
    return this.http.post(`${environment.baseURL}/users`,payload)
  }

  getUserById(id){
    return this.http.get(`${environment.baseURL}/users/${id}`)
  }

  updateUser(id,payload){
    return this.http.post(`${environment.baseURL}/users/${id}`,payload)
  }


}
