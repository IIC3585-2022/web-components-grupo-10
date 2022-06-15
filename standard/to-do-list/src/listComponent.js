import { TodoListDataService } from "./services/todoListService.js";

const AppTemplate = document.createElement("template");
AppTemplate.innerHTML = `
    <style>
        @import url('./src/appComponent.css')
    </style>
    <div class="list-component">
        <div class="todo-list-container">
            <h1 id="title" ></h1>
            <div class="todo-items">
            </div>
            <button class="add-todo-item-btn">+</button>
        </div>
    </div>
`;

export class ListComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(AppTemplate.content.cloneNode(true));

        TodoListDataService.initilalizeState([]);

        if (this.getAttribute("title")){
        this.shadowRoot.querySelector('#title').innerText = this.getAttribute("title");
        } else{
            this.shadowRoot.querySelector('#title').innerText = "Todo List Default"
        }
        
        this.todoList = this.shadowRoot.querySelector(".todo-list-container");
        this.todoItems = this.todoList.querySelector(".todo-items");
        this.addTodoItemBtn = this.todoList.querySelector(".add-todo-item-btn");
        
    }

    connectedCallback() {
        this.$item1 = this.getAttribute("item1")
        this.$item2 = this.getAttribute("item2")
        this.$item3 = this.getAttribute("item3")

        this.$title = this.getAttribute("title")
        this.$prompt = this.getAttribute("prompt")


        this.addStart(this.$item1)
        this.addStart(this.$item2)
        this.addStart(this.$item3)

        this.addTodoItemBtn.addEventListener("click", (e) =>
            this.addTodoItem(e)
        );
    }

    addStart(item){
        let todoItem = document.createElement("todo-item");
        todoItem.setAttribute("starter", item)

        ListComponent.todoIdCount = ListComponent.todoIdCount ?? 0;
        todoItem.id = ListComponent.todoIdCount++;

        //Agregamos el todo como hijo del elemento todo-items
        this.todoItems.appendChild(todoItem);
    }

    addTodoItem(e) {
        e.stopPropagation();

        if (this.$prompt){
            this.addStart(this.$prompt)
        } else{
            //Se crea un elemento con nuestro webcomponent todo-item
            let todoItem = document.createElement("todo-item");

            ListComponent.todoIdCount = ListComponent.todoIdCount ?? 0;
            todoItem.id = ListComponent.todoIdCount++;

            //Agregamos el todo como hijo del elemento todo-items
            this.todoItems.appendChild(todoItem);
        }
    }

    disconnectedCallback() {}
}
