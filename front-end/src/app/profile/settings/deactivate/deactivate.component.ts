import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  HttpClient
} from '@angular/common/http';
import { ConfirmedValidator } from '../../../services/confirmed.validator';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-deactivate',
  templateUrl: './deactivate.component.html'
})
export class DeactivateComponent implements OnInit {

  deactivateForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private UserService:UserService) { }

  ngOnInit(): void {
    this.deactivateForm = this.formBuilder.group({
      userPassword: [null, [Validators.required]],
      userPasswordConfirm: [null, [Validators.required]]
    }, { 
      validator: ConfirmedValidator('userPassword', 'userPasswordConfirm')
    });
  }

  onDelete(){

    this.UserService.profileDelete()

    
  }
  
}
