import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contactUs',
  templateUrl: './contactUs.component.html',
  styleUrls: ['./contactUs.component.css']
})
export class ContactUsComponent implements OnInit {
  contactUs:FormGroup;
  dataValid:string|undefined;
  constructor(private title:Title, private formBuilder:FormBuilder, private http:HttpClient) { 
    this.contactUs = this.formBuilder.group({
      username:['', [Validators.required, Validators.pattern("^[A-Za-z]+$")]],
      email:['', [Validators.required,Validators.pattern("^[0-9a-zA-Z]+[._]{0,1}[0-9a-zA-Z]+[@][a-zA-Z]+[.][a-zA-Z]{2,3}([.][a-zA-Z]{2,3}){0,1}$")]],
      subject:['', Validators.required],
      textarea:['', Validators.required]
    })
  }
  
  ngOnInit() {
    this.title.setTitle('Contact Us | RK MART');
    if(sessionStorage.getItem('userLoggedIn')){
    let username = sessionStorage.getItem('userName');
    let email = sessionStorage.getItem('userMail');

    this.contactUs.controls['username'].setValue(username);
    this.contactUs.controls['email'].setValue(email);

    }
  }

  submitQuery(queryData:any){
    if(this.contactUs.valid){
      this.http.post('http://localhost:3000/Queries',queryData).subscribe();
      this.dataValid = "Query Submitted Successfully";
      setTimeout(()=> { this.dataValid=undefined;  this.contactUs.reset()},2000);
     
    }else{
      this.dataValid = "Enter all the fields";
      setTimeout(()=> this.dataValid=undefined, 3000)
    }
  }

}
