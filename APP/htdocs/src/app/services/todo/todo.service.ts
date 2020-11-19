import {Injectable} from '@angular/core';
import {RestService} from '../rest/rest.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private restService: RestService) {
  }

  index() {
    return this.restService.get('/api/todo');
  }

  create(data) {
    return this.restService.post('/api/todo/', data);
  }

  delete(id) {
    return this.restService.delete('/api/todo/' + id);
  }

  update(id, data) {
    return this.restService.put('/api/todo/' + id, data);
  }
}
