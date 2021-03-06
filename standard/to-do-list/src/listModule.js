import { ListComponent } from "./listComponent.js";
import { TodoItemComponent } from "./components/todoItemComponent.js";

export class ToDoModule {
    static defineElements() {
        window.customElements.define("todo-list", ListComponent);
        window.customElements.define("todo-item", TodoItemComponent);
    }
}
