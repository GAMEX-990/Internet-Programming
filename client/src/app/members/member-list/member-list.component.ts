import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { UserParams } from 'src/app/_models/UserParams ';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { Pagination } from 'src/app/_modules/Pagination ';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  
  members: Member[] = []
  pagination: Pagination | undefined
  userParams: UserParams | undefined 
  user: User | undefined 
  // pageNumber = 1
  // pageSize = 5
  genderList = [
    { value: 'male', display: 'Male' },
    { value: 'female', display: 'Female' },
    { value: 'non-binary', display: 'Non-binary' },
  ]
  resetFilters() {
    if (this.userParams) {
      
      this.userParams = this.memberService.resetUserParams()
      this.loadMember()
    }
  }

  constructor(private memberService: MembersService) {
    this.userParams = this.memberService.getUserParams()
  }

  ngOnInit(): void {
    this.loadMember()
  }

  loadMember() {

    if (this.userParams) {
      this.memberService.setUserParams(this.userParams)
      this.memberService.getMembers(this.userParams).subscribe({
        next: response => {
          if (response.result && response.pagination) {
            this.members = response.result
            this.pagination = response.pagination
          }
        }
      })
    }
  }

  pageChanged(event: any) {
    if (!this.userParams) return
    if (this.userParams.pageNumber === event.page) return
    this.memberService.setUserParams(this.userParams)
    this.loadMember()
  }
}


