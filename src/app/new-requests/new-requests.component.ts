import { Component, OnInit } from '@angular/core';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Leave, UserRegister } from '../User';

@Component({
  selector: 'app-new-requests',
  templateUrl: './new-requests.component.html',
  styleUrls: ['./new-requests.component.css'],
})
export class NewRequestsComponent implements OnInit {
  isVisible = false;
  flag : boolean = true;
  id : string = ''

  showModal(flag : boolean , id : string): void {
    this.isVisible = true;
    this.flag = flag
    this.id = id
  }
  
  handleOk(): void {
    if(this.flag){
      this.accept(this.id);
    }
    else{
      this.reject(this.id);
    }
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  
  users: UserRegister[] = [];
  pendingLeaves: Leave[] = [];
  leaves: Leave[] = [];
  managerMessage: string = '';
  acceptIcon = faCheck;
  rejectIcon = faXmark;
  ngOnInit(): void {
    const leavesData = localStorage.getItem('leaves');
    if (leavesData) {
      this.leaves = JSON.parse(leavesData);
      //in this component we display the leaves which are pending
      this.pendingLeaves = this.leaves.filter(
        (leave) => leave.status === 'pending'
      );
    }
    const usersData = localStorage.getItem('users');
    if (usersData) {
      this.users = JSON.parse(usersData);
    }
    const currentUserData = localStorage.getItem('currentUser')
    if(currentUserData){
      console.log("hi");
    }
    else{
      window.location.href='http://localhost:4200/login'
    }
    
    
  }
  //function for accepting the leave based on the leave id
  accept(id: string) {
    //taking a message from the manager for accepting the leave
    // let message = prompt('Message for Accepting');
    //updating the status of the leave to accepted and
    //appending the manager message to it
    this.leaves.forEach((leave) => {
      if (leave.id === id) {
        leave.status = 'accepted';
        leave.managerReason = this.managerMessage;
      }
    });
    //updating the leaves in the local storage
    localStorage.setItem('leaves', JSON.stringify(this.leaves));
    //filtering the employees from the users array
    let emps: UserRegister[] = this.users.filter(
      (user) => user.role === 'employee'
    );
    //filtering the non-employees(manager) from the users array
    this.users = this.users.filter((user) => user.role !== 'employee');
    //updating the employee leave and
    emps.forEach((emp) => {
      emp.leaves.forEach((leave) => {
        if (leave.id === id) {
          leave.status = 'accepted';
          leave.managerReason = this.managerMessage;
          emp.numberOfLeaves-=1
        }
      });
      //appending the employees array to the users array
      this.users.push(emp);
    });
    //updating the users data in the local storage
    localStorage.setItem('users', JSON.stringify(this.users));
    window.location.reload();
  
  }
  //function for rejecting a leave
  reject(id: string) {
    //taking message from the manager for rejecting the leave
      //updating the status of the leave to rejected and
      //appending the manager message to it
      this.leaves.forEach((leave) => {
        if (leave.id === id) {
          leave.status = 'rejected';
          leave.managerReason = this.managerMessage;
        }
      });
      //updating the leaves in the local storage
      localStorage.setItem('leaves', JSON.stringify(this.leaves));
      //filtering the employees from the users array
      let emps: UserRegister[] = this.users.filter(
        (user) => user.role === 'employee'
      );
      //filtering the non-employees(manager) from the users array
      this.users = this.users.filter((user) => user.role !== 'employee');
      //updating the employee leave and
      emps.forEach((emp) => {
        emp.leaves.forEach((leave) => {
          if (leave.id === id) {
            leave.status = 'rejected';
            leave.managerReason = this.managerMessage;
          }
        });
        //appending the employees array to the users array
        this.users.push(emp);
      });
      //updating the users data in the local storage
      localStorage.setItem('users', JSON.stringify(this.users));
      window.location.reload();
    
  }
}
