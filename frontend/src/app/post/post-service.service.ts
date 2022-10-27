import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  private postdisplay: { _id: string, id: string, name: string, __v: string }[] = [];
  private updatedPostDisplay = new Subject<{ _id: string, id: string, name: string, __v: string }[]>();

  constructor(public http: HttpClient) { }

  // service to write new post
  addPostService(username: string, date: string, department:string, postContent:string) {
    this.http.post<{ message: string, post: any }>('https://localhost:3000/api/post', { _username: username, _date: date, _department:department, _postContent:postContent })
      .subscribe((thePost) => {
        this.postdisplay.push(thePost.post);
        this.updatedPostDisplay.next([...this.postdisplay]);
      })
  }

  // service to retrieve post
  getPostService() {
    this.http.get<{ message: string, post: any }>('https://localhost:3000/api/post')
      .subscribe((thePost) => {
        this.postdisplay = thePost.post
        this.updatedPostDisplay.next([...this.postdisplay]);
      })
  }

  // service to delete post
  deletePostService(postID: string) {
    this.http.delete('https://localhost:3000/api/post/' + postID)
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
