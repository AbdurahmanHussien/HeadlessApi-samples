import { Component } from '@angular/core';
import {LiferayUser} from "../../model/user";
import {LiferayUserService} from "../../service/LiferayUser.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  users: LiferayUser[] = [];
  loading = true;
  error = '';

  constructor(private userService: LiferayUserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data.items;
        this.loading = false;
        console.log(this.users);
      },
      error: (err) => {
        console.error('Failed to fetch Liferay users', err);
        this.error = 'Could not load users.';
        this.loading = false;
      }
    });
  }
}
