import { Pipe, PipeTransform } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
@Pipe({
  name: 'username'
})
export class UsernamePipe implements PipeTransform {

  constructor(private userService: UserService){
  }

  transform(value: string): Observable<string> {
    return this.userService.getUserName(value);
  }

}
