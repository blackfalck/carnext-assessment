import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Todo} from '../../lib/interfaces/Todo';
import {TodoService} from '../../services/todo/todo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  createTodoForm;
  error = null;

  todos: Todo[];
  loading = true;
  loadingButton = false;
  loadingCreate = false;

  constructor(private router: Router, private todoService: TodoService) {
    this.createTodoForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
    });

    this.getTodos();
  }

  getTodos() {
    this.todoService.index().then((todos: Todo[]) => {
      this.todos = todos;
      this.loading = false;
    })
  }

  setCompleted(todo: Todo) {
    const data = {
      title: todo.title,
      is_completed: true
    }
    this.todoService.update(todo.id, data).then((response) => {
      this.getTodos();
    });
  }

  delete(id: number) {
    this.todoService.delete(id).then((response) => {
      this.getTodos();
    });
  }

  ngOnInit(): void {
  }

  onCreate() {
    if (this.createTodoForm.valid) {
      this.loadingCreate = true;

      this.todoService.create(this.createTodoForm.value).then((data) => {
        this.error = null;
        this.loadingCreate = false;
        this.getTodos();
      }).catch((err) => {
        this.error = 'Something went wrong, please try again';
        this.loadingCreate = false;
      })
    }
  }

}
