import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Observable, Subscribable, of } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../_models/user';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
    model: any = {}
    currentUser$: Observable<User | null> = of(null) // isLogin = false
    user: User | null = null
    

    constructor(private toastr: ToastrService, private router: Router, public accountService: AccountService){ }
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

    login(): void {
        this.accountService.login(this.model).subscribe({
            next: response => {
                this.router.navigateByUrl('/members')
            },
            error: err => this.toastr.error(err.error)
        })
    }
    logout() {
        this.accountService.logout()
        this.router.navigateByUrl('/')
    }
}