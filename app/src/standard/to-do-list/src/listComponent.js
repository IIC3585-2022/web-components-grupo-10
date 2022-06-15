
const AppTemplate = document.createElement("template");
AppTemplate.innerHTML = `
    <style>
    .app-component {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100vw;
        color: rgb(0, 0, 0);
    }
    
    .todo-list-container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    
    .todo-items {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    
    .add-todo-item-btn {
        width: 40px;
        height: 40px;
        padding: 10px;
        border-radius: 50%;
        font-weight: 500;
        font-size: 1.2rem;
        border-style: none;
        background: #f1f1f1;
        box-shadow: rgba(3, 8, 20, 0.2) 0px 0.15rem 0.5rem;
    }
    
    .add-todo-item-btn:hover {
        background: #eee;
        transform: rotate(90deg);
    }
    
    .add-todo-item-btn:active {
        background: #92631b;
    }
    
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

        //Agregamos el todo como hijo del elemento todo-items
        this.todoItems.appendChild(todoItem);
    }

    addTodoItem(e) {
        e.stopPropagation();

        if (this.$prompt){
            this.addStart(this.$prompt)
        } else {
            //Se crea un elemento con nuestro webcomponent todo-item
            let todoItem = document.createElement("todo-item");

            //Agregamos el todo como hijo del elemento todo-items
            this.todoItems.appendChild(todoItem);
        }
    }

    disconnectedCallback() {}
}
