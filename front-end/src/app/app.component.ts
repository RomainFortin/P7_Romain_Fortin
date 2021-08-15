import {
  Component
} from '@angular/core';
import {
  Title
} from '@angular/platform-browser';
import {
  Router,
  NavigationEnd,
  ActivatedRoute
} from '@angular/router';
import {
  filter,
  map
} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'projet7';


  constructor(private activatedRoute: ActivatedRoute, private router: Router, private titleService: Title) {}

  ngOnInit(): void {
    const appTitle = this.titleService.getTitle();
    this.router
      .events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          const child = this.activatedRoute.firstChild;
          if (child.snapshot.data['title']) {
            return child.snapshot.data['title'];
          }
          return appTitle;
        })
      ).subscribe((ttl: string) => {
        this.titleService.setTitle(ttl);
      });

  }
}
