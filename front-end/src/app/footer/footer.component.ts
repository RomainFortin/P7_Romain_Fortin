import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  isLocation() {
    if(this.location.path() === '/404' ){
      return false
    }else  {
      return true
    }
  }

  constructor(private location: Location) { }

  ngOnInit(): void {

    

  }

}
