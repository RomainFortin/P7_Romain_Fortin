import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMsg: string;

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router, private user: UserService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  onLogin() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    this.auth.loginUser(email, password).then (
      () => {
        this.router.navigate(['/']);
      }
    )
    .catch(
      () => {
        this.errorMsg = "Mauvais identifiants de connexion";
      }
    );
  }

}
