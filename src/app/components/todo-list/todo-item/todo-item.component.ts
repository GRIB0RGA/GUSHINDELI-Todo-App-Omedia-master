import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from 'src/app/interfaces/todo';
import {
  DifficultyLevels,
  ProgressTypes,
  ButtonColors,
} from 'src/app/enums/enums';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input() todoItem!: Todo;
  @Input() todoIndex!: number;
  @Output() sendItemToDelete = new EventEmitter<number>();

  //? for wrong edit cases
  beforeEditCache = '';

  constructor() {}

  ngOnInit(): void {}

  getDifficultyStyle(difficulty: string) {
    return {
      'todo__difficulty--hard': difficulty === DifficultyLevels.Hard,
      'todo__difficulty--medium': difficulty === DifficultyLevels.Medium,
      'todo__difficulty--easy': difficulty === DifficultyLevels.Easy,
    };
  }

  getButtonStyle(color: string) {
    return color === ButtonColors.Blue
      ? {
          'bg-blue': this.todoItem.justTodo,
        }
      : color === ButtonColors.Green
      ? {
          'bg-green': this.todoItem.justTodo,
        }
      : '';
  }

  updateProgress(type: string): void {
    if (type === ProgressTypes.Regress) {
      if (!this.todoItem.inProgress) {
        this.todoItem.justTodo = false;
        this.todoItem.completed = false;
        this.todoItem.inProgress = true;
      } else if (this.todoItem.inProgress) {
        this.todoItem.justTodo = true;
        this.todoItem.inProgress = false;
      }
    }
    if (type === ProgressTypes.Progress) {
      if (!this.todoItem.inProgress) {
        this.todoItem.inProgress = true;
        this.todoItem.justTodo = false;
      } else if (this.todoItem.inProgress) {
        this.todoItem.justTodo = false;
        this.todoItem.inProgress = false;
        this.todoItem.completed = true;
      }
    }
  }

  deleteItem(todo: Todo): void {
    this.sendItemToDelete.next(todo.id);
  }

  editTodo(todo: Todo): void {
    this.beforeEditCache = todo.title;
    todo.editing = true;
  }
  doneTodoEdit(todo: Todo): void {
    //? check input for empty
    if (todo.title.trim().length === 0) {
      todo.title = this.beforeEditCache;
    }
    todo.editing = false;
  }

  cancelTodoEdit(todo: Todo): void {
    todo.title = this.beforeEditCache;
    todo.editing = false;
  }
}
