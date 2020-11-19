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
        this.error = 'Er is iets fout gegaan, probeer is nog eens.';

        if (err.status === 401) {
          this.error = 'De combinatie van het e-mailadres en het wachtwoord is niet bij ons bekend.';
        }
        this.loading = false;
      })
    }
  }

}
