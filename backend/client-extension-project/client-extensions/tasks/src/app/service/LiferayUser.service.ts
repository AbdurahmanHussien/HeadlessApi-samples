import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {UserResponse} from "../model/user";


// Declare the global Liferay object to satisfy TypeScript
declare const Liferay: any;

@Injectable({
  providedIn: 'root'
})
export class LiferayUserService {

  // Base endpoint
  private readonly API_URL = '/o/headless-admin-user/v1.0/user-accounts';

  getUsers(): Observable<UserResponse> {


    // 2. Use Liferay.Util.fetch (handles Auth & CSRF tokens automatically)
    const fetchPromise = Liferay.Util.fetch(
      this.API_URL
    ).then((response: any) => response.json())
      .catch((error: any) => {
        console.error('Error fetching users:', error);
        throw error;
      });

    // 3. Convert Promise to Observable for standard Angular handling
    return from(fetchPromise) as Observable<UserResponse>;
  }
}
