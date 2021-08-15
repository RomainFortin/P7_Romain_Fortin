import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {


  constructor(private location: Location) { }

  isSettings(){
    if(this.location.path() === '/profile/settings'){
      return 0
    }
    if(this.location.path().indexOf('/profile-settings')>-1){
      return 1
    }
    if(this.location.path().indexOf('/notifications')>-1){
      return 2
    }
    if(this.location.path().indexOf('/deactivate')>-1){
      return 5
    }
  }

  ngOnInit(): void {

    

  }

}
