import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Author } from '../author';


@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.sass']
})
export class AuthorListComponent implements OnInit {

  public attributes = ['id', 'name', 'email', 'birth_date'];
  public authors : Array<Author>; 

  constructor(public apiService: ApiService , public router : Router) {
  }

  ngOnInit() {
    this.apiService.get("authors").subscribe((data : Author[])=>{
    console.log(data);
    this.authors = data;
    });
  }


  public delete(id:string){

    console.log("delete : " + id);
    var path = 'authors/' + id;
    this.apiService.delete(path).subscribe((r)=>{

    this.rows = this.rows.filter((p,i)=>{

        if(Number(id) === p.id ) 
        {
        return false;
        }
        return true;
    },this.rows)

    });

  }

  public update(id:string){
    console.log("update : " + id );
    this.router.navigateByUrl('/authors/add/' + id);
  }

}
