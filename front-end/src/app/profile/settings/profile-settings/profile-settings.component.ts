import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  HttpClient
} from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html'
})
export class ProfileSettingsComponent implements OnInit {

  profileForm: FormGroup;
  fullname:string;
  job:string;

  mySubscription: any;

  constructor(private formBuilder: FormBuilder, private http: HttpClient,private router: Router, private userProfile : UserService) { }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      fullname: [null, [Validators.required]],
      job: [null, [Validators.required]]
    });
  }

  onChanges(){
    const userId = localStorage.getItem('userId')
    const fullname = this.profileForm.get('fullname').value;
    const job = this.profileForm.get('job').value;

    this.userProfile.profileUpdate(userId,fullname,job)

  }

}
