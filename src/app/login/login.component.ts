import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs';
import { RouterService } from '../services/router.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    username = new FormControl();
    password = new FormControl();
    public submitMessage: string;
    public user: FormGroup;

    constructor(private fb: FormBuilder, private authService: AuthenticationService, private routerService: RouterService) {
    }

    ngOnInit() {
        this.user = this.fb.group({
            username: ['', [Validators.required, Validators.pattern('[a-zA-Z]+'), Validators.minLength(3), Validators.maxLength(30)]],
            password: ['', Validators.required]
        })
    }

    loginSubmit() {
        this.authService.authenticateUser(this.user.value).subscribe(
            data => {
                this.authService.setBearerToken(data['token']);
                this.routerService.routeToDashboard();
            },
            err => {
                if (err.status == 403) {
                    this.submitMessage = err.error.message;
                } else {
                    this.submitMessage = err.message;
                }
            }
        )
    }

    get username1() {
        return this.user.get('username');
    }

    get password1() {
        return this.user.get('password');
    }

}
