import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, TitleStrategy } from '@angular/router';
import { Leave, UserRegister } from '../User';

@Component({
  selector: 'app-edit-leave',
  templateUrl: './edit-leave.component.html',
  styleUrls: ['./edit-leave.component.css'],
})
export class EditLeaveComponent implements OnInit {
  constructor(
    private route: ActivatedRoute
  ) {}
  leaves: Leave[] = [];
  leaveId = '';
  currentUser: UserRegister = {
    role: '',
    name: '',
    phone: '',
    email: '',
    password: '',
    leaves: [],
    numberOfLeaves: 0,
  };
  leave: Leave = {
    id: '',
    name: this.currentUser.name,
    type: '',
    startDate: '',
    endDate: '',
    reason: '',
    status: '',
    managerReason: '',
  };
  message = '';
  displayMessage = false;
  ngOnInit(): void {
    //taking the param from the route
    this.leaveId = this.route.snapshot.params['id'];
    //getting the leaves data from the local storage
    const leavesData = localStorage.getItem('leaves');
    if (leavesData) {
      this.leaves = JSON.parse(leavesData);
    }
    //filtering the required leave that has to be edited from the overall leaves
    this.leave = this.leaves.filter((leave) => leave.id === this.leaveId)[0];
    const currentUserData = localStorage.getItem('currentUser');
    //getting the current user data
    if (currentUserData) {
      this.currentUser = JSON.parse(currentUserData);
    }else{
      window.location.href='http://localhost:4200/login'
    }
  }
  //function for saving the changes
  save() {
    //updating the leaves other than the leave which has to be edited
    this.leaves = this.leaves.filter((leave) => leave.id !== this.leaveId);
    //converting the startDate of the leave to the ISO String format
    const startDate = new Date(this.leave.startDate).toISOString();
    //comparing whether the startdate is greater than the current date or not
    if (startDate >= new Date().toISOString()) {
      //converting the endDate of the leave to the ISO String format
      const endDate = new Date(this.leave.endDate).toISOString();
      //comparing whether the endDate is greater than the startDate or not
      if (endDate >= startDate) {
        //updating the leaves array with the new edited leave
        this.leaves.push(this.leave);
        //setting the updated leaves array into the local storage
        localStorage.setItem('leaves', JSON.stringify(this.leaves));
        //updating the currentUser leaves other than the leave which has to be edited
        this.currentUser.leaves = this.currentUser.leaves.filter(
          (leave) => leave.id !== this.leaveId
        );
        //appending the edited leave to the currentUser leaves array
        this.currentUser.leaves.push(this.leave);
        localStorage.setItem('currentUser',JSON.stringify(this.currentUser))
        // // this.cookieService.delete('currentUser');
        // this.cookieService.set(
        //   'currentUser',
        //   JSON.stringify(this.currentUser),
        //   1,
        //   './'
        // );

        window.location.href = 'http://localhost:4200/employee/track-leaves';
      } else {
        //displayin error message if the endDate is not greater than startDate
        this.message = 'End Date must be Start Date or greater than Start Date';
        this.displayMessage = true;
        setTimeout(() => (this.displayMessage = false), 2000);
      }
    } else {
      //displaying error message if the startDate is not greater than the current Date
      this.message = 'Start Date must be from Today or greater';
      this.displayMessage = true;
      setTimeout(() => (this.displayMessage = false), 2000);
    }
  }
}
