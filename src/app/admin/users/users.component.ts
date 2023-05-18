import { Component, OnInit } from '@angular/core';
import { AdminProductsService } from '../adminProducts.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  registeredUsers: any = "";

  constructor(private registeredUser: AdminProductsService, private title:Title) {
    this.registeredUser.getUsers().subscribe(user => this.registeredUsers = user)
  }

  ngOnInit(){
    this.title.setTitle('Users | RK MART');
  }


  removerUser(userId: any) {
    let result = confirm("Are you sure want to remove");
    if (result) {
      this.registeredUser.removerUser(userId).subscribe(() => {

        alert("User Removed Successfully");
      });
    }

    this.registeredUser.getUsers().subscribe(user => this.registeredUsers = user)
  }

}
