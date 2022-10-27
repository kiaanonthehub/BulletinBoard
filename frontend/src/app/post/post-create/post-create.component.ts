import { Component, OnInit } from '@angular/core';
// add forms import to use NgForm
import { NgForm } from '@angular/forms';
// import service
import { PostServiceService } from '../post-service.service';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor(public postservice: PostServiceService) { }

  ngOnInit(): void {
  }

  onAddPost(postForm: NgForm) {
    if (postForm.invalid) {
      alert('Invalid')
      return
    }
    alert(postForm.value.enteredID + ':' + postForm.value.enteredName)

    // http post
    // this.postservice.addPostService(postForm.value., postForm.value.enteredName)
    // postForm.resetForm()
  }
}
