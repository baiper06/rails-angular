import { Component, OnInit } from '@angular/core';
import { Author } from '../author';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-author-add',
  templateUrl: './author-add.component.html',
  styleUrls: ['./author-add.component.sass']
})
export class AuthorAddComponent implements OnInit {

  public author : Author  = new Author();
  public method : string;

  constructor(public apiService: ApiService , public acRoute : ActivatedRoute) { }

  ngOnInit() {
    this.acRoute.params.subscribe((data : any)=>{
    console.log(data.id);
    if(data && data.id){
        this.apiService.get("authors/"+data.id).subscribe((data : Author)=>{
        this.author = data;
        });
        this.method = "Update"
    }
    else
    {
        this.author = new Author();
        this.method = "Create"
    }
    })
  }


  public onSubmit(){
    console.log("Adding a author: " + this.author.name);
    if(this.author.id){
    this.apiService.update("authors/"+this.author.id,this.author).subscribe((r)=>{
        console.log(r);
        alert("Author updated !");
    })
    }
    else
    this.apiService.post("authors",this.author).subscribe((r)=>{
    console.log(r);
    this.author = new Author();
    alert("Author added !");

    });
  }


}








