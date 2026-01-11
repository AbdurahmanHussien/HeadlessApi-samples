import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {TasksResponse} from "../model/Task";

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private apiUrl = 'http://98.85.104.136:8082/rest/eservices/v1/tasks';

  private defaultUser = 'john.doe';

  constructor(private http: HttpClient) {}

  getTasks(
    systemCode: string,
    page: number,
    pageSize: number,
    filters: any
  ): Observable<TasksResponse> {

    let params = new HttpParams()
      .set('systemCode', systemCode)
      .set('ADUserName', this.defaultUser)
      .set('Page', page.toString())
      .set('PageSize', pageSize.toString());

    if (filters.searchString) {
      params = params.set('SearchString', filters.searchString);
    }
    if (filters.status) {
      params = params.set('Status', filters.status);
    }
    if (filters.date) {
      params = params.set('CreatedDate', filters.date);
    }

    return this.http.get<TasksResponse>(this.apiUrl, { params });
  }



  private formatDate(date: Date | string): string {
    if (!date) return '';

    if (typeof date === 'string') {
      return date;
    }

    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
}
