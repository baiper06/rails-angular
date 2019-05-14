import { Component, OnInit } from '@angular/core';
import { Publication } from '../publication';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-publication-add',
  templateUrl: './publication-add.component.html',
  styleUrls: ['./publication-add.component.sass']
})
export class PublicationAddComponent implements OnInit {

  public publication : Publication  = new Publication();

  constructor(public apiService: ApiService , public acRoute : ActivatedRoute) { }

  ngOnInit() {
    this.acRoute.params.subscribe((data : any)=>{
    console.log(data.id);
    if(data && data.id){
        this.apiService.get("publications/"+data.id).subscribe((data : Publication)=>{
        this.publication = data;
        });
    }
    else
    {
        this.publication = new Publication();
    }
    })
  }


  public onSubmit(){
    console.log("Adding a publication: " + this.publication.title);
    if(this.publication.id){
    this.apiService.update("publications/"+this.publication.id,this.publication).subscribe((r)=>{
        console.log(r);
        alert("Publication updated !");
    })
    }
    else
    this.apiService.post("publications",this.publication).subscribe((r)=>{
    console.log(r);
    this.publication = new Publication();
    alert("Publication added !");

    });
  }


}








