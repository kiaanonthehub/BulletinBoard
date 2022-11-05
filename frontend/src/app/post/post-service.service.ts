import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Subject } from 'rxjs';
import { Post } from './post.model';
import { AuthServiceService } from '../auth/auth-service.service';
import { Router } from '@angular/router';
import { AuthData } from '../auth/auth-data.model';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {


  private postdisplay: { _id: string, _username: string, username: string, _date: string, date: string, _department: string, department: string, _postContent: string, postContent: string, __v: string }[] = [];
  private updatedPostDisplay = new Subject<{ _id: string, _username: string, username: string, _date: string, date: string, _department: string, department: string, _postContent: string, postContent: string, __v: string }[]>();


  constructor(public http: HttpClient, private authService: AuthServiceService, private router: Router) { }

  // service to write new post
  addPostService(pdate: string, ppostContent: string|null) {
    
    const token: string|undefined = this.authService.getToken();

    let decodedToken: AuthData;
    let post: Post;

    if (!token) {
      post = { username: '', department: '', date: pdate, postContent: ppostContent}
    }
    else {
      //decode the token to get the signed in user's information
      decodedToken = jwt_decode(token);
      post = { username: decodedToken.username, department: decodedToken.department, date: pdate, postContent: ppostContent }
    }

    this.http.post<{ message: string, posts: any }>('https://localhost:3000/api/posts',  post )
      .subscribe((thePost) => {
        this.postdisplay.push(thePost.posts);
        this.updatedPostDisplay.next([...this.postdisplay]);
        this.router.navigateByUrl('/posts');
      })
  }

  // service to retrieve post
  getPostService() {
    this.http.get<{ message: string, posts: any }>('https://localhost:3000/api/posts')
      .subscribe((thePost) => {
        this.postdisplay = thePost.posts
        this.updatedPostDisplay.next([...this.postdisplay]);
      })
  }

  // service to delete post
  deletePostService(postID: string) {
    this.http.delete('https://localhost:3000/api/posts/' + postID)
      .subscribe(() => {
        const updatedPostDeleted = this.postdisplay.filter(post => post._id !== postID);
        this.postdisplay = updatedPostDeleted;
        this.updatedPostDisplay.next([...this.postdisplay]);
      })
  }

  getUpdatedListener() {
    return this.updatedPostDisplay.asObservable();
  }

}
