import {
  Component,
  OnInit
} from '@angular/core';
import {
  TopicService
} from '../services/topic.service';
import {
  Subscription
} from 'rxjs';
import {
  Topic
} from '../models/Topic.model';
import {
  NgbModal
} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html'
})
export class TopicComponent implements OnInit {

  topicSub: Subscription;
  topics: Topic[];

  constructor(private topic: TopicService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.topicSub = this.topic.topics$.subscribe(
      (topics) => {
        this.topics = topics;
        for (let i = 0; this.topics.length; i++) {
          this.topics[i].createdAt = moment(this.topics[i].createdAt).format('DD/MM/YYYY');
        }
      },
      (error) => {
        console.log(error);
      }
    );
    this.topic.getTopics();
    this.checkRole()
  }

  checkRole(){
    if(localStorage.getItem('role') == 'moderateur'){
     return true
    } else {
      return false
    }
  }

  open(content) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title'
    })
  }

  deleteTopic(a){
    this.topic.topicDelete(a)
  }

}
