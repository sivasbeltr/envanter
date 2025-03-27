//todo service for jsonplaceholder

import { TodoItem } from "../models/todo-item";

export class TodoService {
    private static instance: TodoService;
    private todos: TodoItem[] = [];
    private baseUrl = "https://jsonplaceholder.typicode.com/todos";

    private constructor() { }

    public static getInstance(): TodoService {
        if (!TodoService.instance) {
            TodoService.instance = new TodoService();
        }
        return TodoService.instance;
    }

    public async fetchTodos(): Promise<TodoItem[]> {
        const response = await fetch(this.baseUrl);
        this.todos = await response.json();
        return this.todos;
    }

    public async fetchTodoById(id: number): Promise<TodoItem | undefined> {
        if (this.todos.length === 0) {
            await this.fetchTodos();
        }
        return this.todos.find(todo => todo.id === id);
    }

    public getTodos(): TodoItem[] {
        return this.todos;
    }
}