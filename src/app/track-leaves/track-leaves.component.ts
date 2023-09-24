import { Component, OnInit } from '@angular/core';
import { UserRegister, Leave } from '../User';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-track-leaves',
  templateUrl: './track-leaves.component.html',
  styleUrls: ['./track-leaves.component.css'],
})
export class TrackLeavesComponent implements OnInit {
  currentUser: UserRegister = {
    role: '',
    name: '',
    phone: '',
    email: '',
    password: '',
    leaves: [],
    numberOfLeaves: 0,
  };
  deleteIcon = faTrashCan;
  editIcon = faPenToSquare;
  leaves: Leave[] = [];
  ngOnInit(): void {
    const currentUserData = localStorage.getItem('currentUser');
    if (currentUserData) {
      this.currentUser = JSON.parse(currentUserData);
    }else{
      window.location.href='http://localhost:4200/login'
    }
    const leavesData = localStorage.getItem('leaves');
    if (leavesData) {
      this.leaves = JSON.parse(leavesData);
    }
  }
  delete(id: string) {
    //filtering out the leaves which are other than deleted leave
    //from the user leaves and updating the user leaves
    this.currentUser.leaves = this.currentUser.leaves.filter(
      (leave) => leave.id !== id
    );
    localStorage.setItem('currentUser',JSON.stringify(this.currentUser),);

    let users: UserRegister[] = [];
    const usersData = localStorage.getItem('users');
    if (usersData) {
      users = JSON.parse(usersData);
      //updating the current user data in the localstorage as well
      users.forEach((user) => {
        if (user.email === this.currentUser.email) {
          user.leaves = user.leaves.filter((leave) => {
            leave.id !== id;
          });
        }
      });
    }
    this.leaves = this.leaves.filter((leave) => leave.id !== id);
    localStorage.setItem('leaves', JSON.stringify(this.leaves));
    //updating the local storage
    localStorage.setItem('users', JSON.stringify(users));
    window.location.reload();
  }
}
