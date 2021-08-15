import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ConfirmedValidator } from '../../services/confirmed.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {

  signForm: FormGroup;
  errorMsg: string;

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.signForm = this.formBuilder.group({
      fullname: [null, [Validators.required, Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    }, { 
      validator: ConfirmedValidator('password', 'confirmPassword')
    });
  }

  
  onSignup() {
    const fullname = this.signForm.get('fullname').value;
    const email = this.signForm.get('email').value;
    const password = this.signForm.get('password').value;
    this.auth.createUser(fullname, email, password).then(
      (response: { message: string }) => {
        localStorage.setItem('email', email);
        this.auth.loginUser(email, password).then(
          () => {
            this.router.navigate(['/']);
          }
        )
        .catch(
          (error) => {
            this.errorMsg = error.message;
          }
        );
      }
    ).catch(() => {
      this.errorMsg = "Utilisateur déjà existant";
    });
  }

}
