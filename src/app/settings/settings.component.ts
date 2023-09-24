import { Component, OnInit } from '@angular/core';
import { UserRegister } from '../User';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  oldNumberOfLeaves: number = 0;
  numberOfLeaves!: number;
  users: UserRegister[] = [];
  ngOnInit(): void {
    const usersData = localStorage.getItem('users');
    if (usersData) {
      this.users = JSON.parse(usersData);
    }
    const numberOfLeavesData = localStorage.getItem('numberOfLeaves');
    if (numberOfLeavesData) {
      this.oldNumberOfLeaves = JSON.parse(numberOfLeavesData);
    }
    const currentUserData = localStorage.getItem('currentUser');
    if (currentUserData) {
      console.log('hi');
    } else {
      window.location.href = 'http://localhost:4200/login';
    }
  }
  onSubmit() {
    this.users.forEach((user) => {
      if (user.role === 'employee') {
        user.numberOfLeaves = this.numberOfLeaves;
      }
    });
    localStorage.setItem('users', JSON.stringify(this.users));
    localStorage.setItem('numberOfLeaves', JSON.stringify(this.numberOfLeaves));
    window.location.href = 'http://localhost:4200/manager/new-requests';
  }
}
