import { Component, OnInit } from '@angular/core';
import { ignoreElements } from 'rxjs';
import { Leave, UserRegister } from '../User';

@Component({
  selector: 'app-leave-history',
  templateUrl: './leave-history.component.html',
  styleUrls: ['./leave-history.component.css'],
})
export class LeaveHistoryComponent implements OnInit {
  currentUser: UserRegister = {
    leaves: [],
    role: '',
    name: '',
    phone: '',
    email: '',
    password: '',
    numberOfLeaves: 0,
  };
  AcceptedLeaves: Leave[] = [];
  RejectedLeaves: Leave[] = [];
  PendingLeaves: Leave[] = [];
  leaves : Leave[]=[]
  numberOfLeaves = 0;
  ngOnInit(): void {
    const currentUserData = localStorage.getItem('currentUser');
    if(currentUserData){
      this.currentUser = JSON.parse(currentUserData)
    }else{
      window.location.href='http://localhost:4200/login'
    }
    //filtering the leaves of the currentUser based on their status
    //so as to represent the number of leaves in each category

    this.AcceptedLeaves = this.currentUser.leaves.filter(
      (leave) => leave.status === 'accepted'
    );
    this.RejectedLeaves = this.currentUser.leaves.filter(
      (leave) => leave.status === 'rejected'
    );
    this.PendingLeaves = this.currentUser.leaves.filter(
      (leave) => leave.status === 'pending'
    );
    const leavesData = localStorage.getItem('numberOfLeaves');
    if(leavesData){
      this.numberOfLeaves = JSON.parse(leavesData)
    }
  }
}
