import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class StoryUserService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  getStories(projectId: string): Observable<any> {
    const url = `${this.apiUrl}/storyUsers?id=${projectId}`;
    return this.http.get<any>(url);
  }

  newStoriUser(newStory: {name: string, project_id:number}): Observable<any> {
    return this.http.post(`${this.apiUrl}/createStoriUser`, newStory);
  }

}





