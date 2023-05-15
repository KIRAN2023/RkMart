import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.css']
})
export class QueriesComponent implements OnInit {
  queries:any="";
  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.http.get('http://localhost:3000/Queries').subscribe((queryData:any)=>{
      this.queries = queryData;
    })
  }

}
