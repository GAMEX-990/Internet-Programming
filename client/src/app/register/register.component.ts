import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @Output() isCancel = new EventEmitter()
  model: any = {}
  usersFromHomeCpmponent: any;
  constructor(private toastr: ToastrService, private accountService: AccountService) { }
  register() {
    this.accountService.register(this.model).subscribe({
      next: response => {

      },
      error: err => this.toastr.error(err)
    })
  }
  cancel() {
    this.isCancel.emit(true)
  }
}
