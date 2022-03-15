import { Component, OnInit } from '@angular/core';

import { Todo } from '../../interfaces/todo';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  id: number = 0;
  title: string = '';
  selectedOption: string = '';

  todos!: Todo[];

  constructor() {}

  ngOnInit(): void {
    this.todos = [];
  }

  onAddClick(): void {
    //? check input and dropdown
    if (this.title.trim().length === 0 || !this.selectedOption) {
      return;
    }

    //? add todo
    this.todos.push({
      id: this.id++,
      title: this.title,
      difficulty: this.selectedOption,
      justTodo: true,
      inProgress: false,
      completed: false,
      editing: false,
    });

    //? reset input and dropdown
    this.title = '';
    this.selectedOption = '';
  }

  justTodo(): Todo[] {
    return this.todos.filter((todo) => todo.justTodo);
  }

  todosInProgress(): Todo[] {
    return this.todos.filter((todo) => todo.inProgress);
  }
  todosCompleted(): Todo[] {
    return this.todos.filter((todo) => todo.completed);
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }
}
