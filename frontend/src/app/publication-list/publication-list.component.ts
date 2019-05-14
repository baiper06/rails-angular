import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Publication } from '../publication';


@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.sass']
})
export class PublicationListComponent implements OnInit {

  public attributes = ['id', 'author', 'title', 'body', 'date', 'time'];
  public publications : Array<Publication>; 

  constructor(public apiService: ApiService , public router : Router) {
  }

  ngOnInit() {
    this.apiService.get("publications").subscribe((data : Publication[])=>{
    console.log(data);
    this.publications = data;
    });
  }


  public delete(id:string){

    console.log("delete : " + id);
    var path = 'publications/' + id;
    this.apiService.delete(path).subscribe((r)=>{

    this.publications = this.publications.filter((p,i)=>{

        if(Number(id) === p.id ) 
        {
        return false;
        }
        return true;
    },this.publications)

    });

  }

  public update(id:string){
    console.log("update : " + id );
    this.router.navigateByUrl('/publications/add/' + id);
  }


  public create(){
    console.log("create" );
    this.router.navigateByUrl('/publications/add/');
  }


}