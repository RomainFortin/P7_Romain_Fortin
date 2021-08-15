import {
  Component,
  OnInit
} from '@angular/core';
import {
  Location
} from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  NgbModal
} from '@ng-bootstrap/ng-bootstrap';
import { PostService } from '../services/post.service';
import { Post } from '../models/Post.model';
import { TopicService } from '../services/topic.service';
import { Topic } from '../models/Topic.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit {

  form: FormGroup;
  post: Post;

  context: string;

  imagePreview: string;
  message: string;

  constructor(private location: Location, private formBuilder: FormBuilder, private modalService: NgbModal,private posts: PostService,private topics: TopicService) {
    if (this.location.path() === '') {
      this.context = 'article'
    }
    if (this.location.path().indexOf('/forum') > -1) {
      this.context = 'sujet'
    }
  }

  open(content) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title'
    })
  }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      title: [null, [Validators.required]],
      image: [null],
      text: [null, [Validators.required]]
    });

  }

  submitPost() {
    const newPost = new Post();
    newPost.author = localStorage.getItem('name');
    newPost.title = this.form.get('title').value;
    newPost.text = this.form.get('text').value;
    newPost.imageUrl = this.form.get('image').value;
    newPost.fk_userid = localStorage.getItem('userId')

      this.posts.createPost(newPost, this.form.get('image').value).then(
        (response: { message: string }) => {
          console.log(response.message);
          window.location.reload()
        }
      ).catch(
        (error) => {
          console.error(error);
        }
      );
  }

  submitTopic(){
    const newTopic = new Topic();
    newTopic.author = localStorage.getItem('name');
    newTopic.title = this.form.get('title').value;
    newTopic.text = this.form.get('text').value;
    newTopic.imageUrl = this.form.get('image').value;
    newTopic.fk_userid = localStorage.getItem('userId')

      this.topics.createTopic(newTopic, this.form.get('image').value).then(
        (response: { message: string }) => {
          window.location.reload()
        }
      ).catch(
        (error) => {
          console.error(error);
        }
      );
  }

  onImageAdded(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.get('image').setValue(file);
    this.form.updateValueAndValidity();
    if (file.type.match(/image\/*.jpg|.jpeg|.png|.gif/) == null) {
      this.message = "Seuls les types JPEG, JPG, PNG et GIF sont supportés";
      this.imagePreview = null
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onImageRemoved(){
    this.imagePreview = null
    this.form.get('image').setValue(null);
  }

  onCancel(){
    window.location.reload()
  }

}
