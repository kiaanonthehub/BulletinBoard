import { Component, OnInit, SecurityContext } from '@angular/core';
// add forms import to use NgForm
import { NgForm } from '@angular/forms';
// import service
import { PostServiceService } from '../post-service.service';

import { DomSanitizer } from '@angular/platform-browser';

import { Subscription } from 'rxjs';
import { AuthServiceService } from '../../auth/auth-service.service';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor(public postservice: PostServiceService, protected sanitizer: DomSanitizer, public authService: AuthServiceService) { }

  postError: string = 'Post cannot be empty';


  private loginSub: Subscription = new Subscription;
  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.isLoggedIn = this.authService.checkLogin();
  }

  onAddPost(postForm: NgForm) {
    if (postForm.invalid) {
      return
    }
    // http post
    this.postservice.addPostService(new Date().toDateString(), this.sanitizer.sanitize(SecurityContext.HTML, postForm.value.postContent))
    postForm.resetForm()
  }
}
