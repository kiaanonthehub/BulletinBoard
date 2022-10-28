import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  private postdisplay:
    { username: string, _username: string, date: string, _date: string, department: string, _department: string, postContent: string, _postContent: string }[] = [];
  private updatedPostDisplay = new Subject<
    { username: string, _username: string, date: string, _date: string, department: string, _department: string, postContent: string, _postContent: string }[]>();

  constructor(public http: HttpClient) { }

  // service to write new post
  addPostService(username: string, _date: string, department:string, postContent:string) {
    this.http.post<{ message: string, post: any }>('https://localhost:3000/api/posts', { _username: username, _date: _date, _department:department, _postContent:postContent })
      .subscribe((thePost) => {
        this.postdisplay.push(thePost.post);
        this.updatedPostDisplay.next([...this.postdisplay]);
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
        const updatedPostDeleted = this.postdisplay.filter(post => post.username !== postID);
        this.postdisplay = updatedPostDeleted;
        this.updatedPostDisplay.next([...this.postdisplay]);
      })
  }

  getUpdatedListener() {
    return this.updatedPostDisplay.asObservable();
  }

}
