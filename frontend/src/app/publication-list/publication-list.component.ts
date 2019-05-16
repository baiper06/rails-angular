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

  public attributes = ['author', 'title', 'body', 'date', 'time'];
  public publications : Array<Publication>; 
  public authors : Array<Author>; 
  public page = 1; 
  public sortedBy : string = "title_asc"; 
  public searchQuery : string = ""; 
  public authorId : string = ""; 

  constructor(public apiService: ApiService , public router : Router) {
	this.apiService.get("authors").subscribe((data : Author[])=>{
		console.log(data);
		this.authors = data;
		});
  }

  ngOnInit() {
    this.refreshList();
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


  public previousPage(){
    this.page -= 1;
    this.refreshList();
  }

  public nextPage(){
    this.page += 1;
    this.refreshList();
  }


  public getSortedBy(param:string){
	console.log(param);
    this.sortedBy = param;
    this.refreshList();
  }

  public getSearchQuery(param:string){
	console.log(param);
    this.searchQuery = param;
    this.refreshList();
  }

  public getByAuthor(id:string){
	console.log(id);
    this.authorId = id;
    this.refreshList();
  }

  public cleanAuthorFilter(){
    this.authorId = "";
    this.refreshList();
  }


  private refreshList(){
    this.apiService.get("publications", {	'page': this.page, 
											'sorted_by': this.sortedBy, 
											'search_query': this.searchQuery, 
											'author_id': this.authorId }
						).subscribe((data : Publication[])=>{
															console.log(data);
															this.publications = data;
															});
  }

}
