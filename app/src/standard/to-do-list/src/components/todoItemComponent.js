const swimLaneTemplate = document.createElement("template");
swimLaneTemplate.innerHTML = `
    <style>
    .todo-item {
        background: var(--primary-color);
        color: var(--text-color);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
        margin: 10px;
        border-radius: 5px;
        width: 250px;
    }
    
    .todo-content {
        margin: 0 10px;
    }
    
    .spacer {
        flex: 1 1 auto;
    }
    
    .content-input {
        border-style: none;
        border-radius: 3px;
        font-weight: bold;
        height: 20px;
        width: 155px;
        box-shadow: rgba(3, 8, 20, 0.2) 0px 0.15rem 0.5rem;
    }
    
    .delete-todo-item-btn {
        padding: 0 5px;
        margin-right: 5px;
        border-radius: 3px;
        font-weight: 500;
        font-size: 1.2rem;
        border-style: none;
        background: #0000ff;
        box-shadow:  rgba(3, 8, 20, 0.2) 0px 0.15rem 0.5rem;
        color: #f1f1f1;
        transition: background 500ms;
    }
    
    .delete-todo-item-btn:hover {
        background: #7777ff;
    }
    
    .delete-todo-item-btn:active {
        background: #92631b;
    }
    
    .strike-through {
        text-decoration: line-through;
    }
    
    input[type=checkbox] {
        zoom: 1.7;
    }
    </style>
    <div class="todo-item">
        <div class="todo-content">
            <input class="content-input" hidden type="text"/>
            <span class="content-display"></span>
        </div>
        <div class="spacer"></div>
        <button class="delete-todo-item-btn">✕</button>
    </div>
`;

export class TodoItemComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(swimLaneTemplate.content.cloneNode(true));

        this.editingContent = false;
        this.mouseDownEl = null;

        this.todoItem = this.shadowRoot.querySelector(".todo-item");
        
        this.todoContent = this.todoItem.querySelector(".todo-content");
        this.contentInput = this.todoContent.querySelector(".content-input");
        this.contentDisplay = this.todoContent.querySelector(".content-display");
        this.deleteTodoItemBtn = this.todoItem.querySelector(".delete-todo-item-btn");
    }

    connectedCallback() {

        this.$starter = this.getAttribute("starter")
        this.$prompt = this.getAttribute("prompt")

        if (this.$starter){
            this.contentInput.value = this.$starter
            this.contentDisplay.innerHTML = this.contentInput.value;
        }else{
            this.contentInput.value = "Task " + this.id;
            this.contentDisplay.innerHTML = this.contentInput.value;
        }
        
        
        // Si hago click en el contentDisplay, se ejecuta editContent, que nos permite editar contenido
        this.contentDisplay.addEventListener("click", (e) =>
            this.editContent(e)
        );

        this.todoItem.addEventListener("mousedown", (e) =>
            this.todoItemClicked(e)
        );

        document.addEventListener("mousedown", (e) => this.documentClicked(e));

        this.deleteTodoItemBtn.addEventListener("click", (e) =>
            this.deleteTodoItem(e)
        );
    }

    editContent(e) {
        e.stopPropagation();

        this.editingContent = true;
        this.contentInput.hidden = false;
        this.contentInput.select();
        this.contentDisplay.hidden = true;

    }

    todoItemClicked(e) {
        this.mouseDownEl = e.target;
    }

    documentClicked(e) {
        if (
            this.editingContent &&
            (!this.mouseDownEl ||
                (this.mouseDownEl &&
                    !this.mouseDownEl.matches(".content-input")))
        ) {
            this.saveContent(e);
        }
        this.mouseDownEl = null;
    }

    saveContent(e) {
        e.stopPropagation();
        this.editingContent = false;
        this.contentDisplay.innerHTML = this.contentInput.value;

        this.contentInput.hidden = true;
        this.contentDisplay.hidden = false;

        //Funcion que actualiza nuestro estado en modulo de datos js
    }

    deleteTodoItem(e) {
        e.stopPropagation();
        let todoItem = this;
        if (todoItem.parentNode && todoItem.parentNode.matches(".todo-items")) {
            // Elimina el elemento en los datos
            // Elimina el nodo hijo del DOM
            todoItem.parentNode.removeChild(todoItem);
        }
    }

    disconnectedCallback() {
    }
}
