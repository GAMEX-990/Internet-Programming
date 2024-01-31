import { Component, OnInit } from '@angular/core';
import { Member } from '../_models/member';
import { MembersService } from '../_services/members.service';
import { Pagination } from '../_modules/Pagination ';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  members: Member[] | undefined
  pageNumber = 1
  pageSize = 5
  pagination: Pagination | undefined
  predicate = 'liked'
  constructor(private memberService: MembersService) { }
  loadLikes() {
    this.memberService.getLikes(this.predicate, this.pageNumber, this.pageSize).subscribe({
      next: reponse => {
        this.members = reponse.result
        this.pagination = reponse.pagination
      }
    })
  }
  ngOnInit(): void {
    this.loadLikes()
  }
  pageChanged(event: any) {
    if (this.pageNumber === event.page) return
    this.pageNumber = event.page
    this.loadLikes()
  }
}

