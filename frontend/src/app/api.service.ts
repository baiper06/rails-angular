import { Injectable } from '@angular/core';

/*Other imports*/
import {HttpClientModule} from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_URL : string = "http://localhost:3000/";

  constructor(public http: HttpClient) { }


  // read method    
  public get(path:string, params:any = {}) {
      var endpoint = this.API_URL + path;
      return this.http.get(endpoint, {params: params});

  }


  // create method 
  public post(path:string,body:any) {

      var endpoint = this.API_URL + path;
      return this.http.post(endpoint,body);

  }


  // delete method    
  public delete(path:string){

    var endpoint = this.API_URL + path;
    return this.http.delete(endpoint);

  }  


  // update method    
  public update(path:string, body:any){
    var endpoint = this.API_URL + path;
    return this.http.put(endpoint,body);
  }


}
