import { Component, OnInit } from '@angular/core';
import { Leave } from '../User';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
})
export class OverviewComponent implements OnInit {
  allLeaves: Leave[] = [];
  ngOnInit(): void {
    const leavesData = localStorage.getItem('leaves');
    //retrieving and storing all the leaves data so as to display it to the manager
    if (leavesData) {
      this.allLeaves = JSON.parse(leavesData);
      this.allLeaves = this.allLeaves.filter(
        (leave) => leave.status !== 'pending'
      );
    }
    const currentUserData = localStorage.getItem('currentUser')
    if(currentUserData){
      console.log("hi");
    }
    else{
      window.location.href='http://localhost:4200/login'
    }
    
  }
}
