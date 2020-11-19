import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm;
  loading = false;
  error = null;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {

  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.userService.login(this.loginForm.value).then((data) => {
        this.error = null;
        this.router.navigate(['/'])
      }).catch((err) => {
        this.error = 'Something went wrong, please try again.';

        if (err.status === 401) {
          this.error = 'The combination of username and password is not known.';
        }
        this.loading = false;
      })
    }
  }

}
