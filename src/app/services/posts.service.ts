import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {


  url: string ="https://60b86f99b54b0a0017c03949.mockapi.io/posts";
  httpOptions = {};

  constructor(private http:HttpClient) { }

  getPosts(): Observable<HttpResponse<Object>>{

    console.log(this.url)

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'


      })
    }

    return this.http.get<HttpResponse<object>>(this.url,this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );  
  }


  addPost(post):Observable<HttpResponse<Object>>{

    var postObject = {
    post_name : post.postName,
    post_date : post.postDate,
    post_description : post.postDesc,
    post_author: post.postAuthor,
    post_breif_description : post.post_brief_desc
    }
    console.log(this.url)
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'


      })
    }

    console.log(JSON.stringify(postObject))

    return this.http.post<HttpResponse<object>>(this.url,JSON.stringify(postObject),this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );  
  }


  editPost(post):Observable<HttpResponse<Object>>{

    var postObject = {
      id: post.id,
      post_name : post.postName,
      post_date : post.postDate,
      post_description : post.postDesc,
      post_author: post.postAuthor,
      post_breif_description : post.post_brief_desc
    }
    console.log(postObject.id)

    console.log(this.url)

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'


      })
    }

    console.log(JSON.stringify(postObject))

    return this.http.put<HttpResponse<object>>(this.url+ '/' + postObject.id,JSON.stringify(postObject),this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );  
  }

  deletePost(id):Observable<HttpResponse<Object>>{

    console.log(id)
    return this.http.delete<HttpResponse<object>>(this.url+ '/' + id,this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );  
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "server Error");
  }

}


