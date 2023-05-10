import { Component } from '@angular/core';
import { AdminProductsService } from '../adminProducts.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  registeredUsers: any = "";

  constructor(private registeredUser: AdminProductsService) {
    this.registeredUser.getUsers().subscribe(user => this.registeredUsers = user)
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
