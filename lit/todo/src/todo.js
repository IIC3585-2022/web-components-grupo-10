import { LitElement, html, css } from 'lit-element'; 

const addTemplate = (prompt, addTodo) => html`
<div>
${prompt}: <input type="text" @change=${addTodo}></input> <button>+</button>
</div>`

const todoTemplate = (todo, index, removeTodo) => html`
<div class="todoItem">
<span>${todo}</span>
<button @click=${removeTodo}>-</button>
</div>
`
class TodoView extends LitElement { 
  static get properties() {
    return {
    title: {type: String},
    prompt: {type: String},
    todos: { type: Array },
    initialTodos: { type: String },
    };
  }
  constructor() {
  super(...arguments);
  this.title = 'Default Title';
  this.initialTodos= '';
  this.todos = [];
  this.prompt = 'Default Input';
  }

  static get styles() {
    return css`
    .todos {
    max-width: 500px;
    margin-bottom: 20px;
    }
    .todoItem {
      background: #f1f1f1;
      display: flex;
      justify-content: space-between;
      padding: 10px;
      margin: 10px;
      border-radius: 5px;
      width: 400px;

    }
    button {
      padding: 5px;
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
    `
  }

  addTodo(e) {
    this.todos = [...this.todos, e.target.value];
    e.target.value = '';
  }
  
  removeTodo(e) {
    const todo = e.target.parentElement.querySelector('span').innerText
    this.todos = this.todos.filter(t => t !== todo);
  }

  connectedCallback() {
    super.connectedCallback()
    this.todos = [...this.initialTodos.split(',').filter(todo => todo.length > 0)];
  }

  render() {
    return html`
      <div>
      <h2>${this.title}</h2>
      ${this.todos.length ? html`<div class="todos">${this.todos.map((todo, index) => todoTemplate(todo, index, this.removeTodo))}</div>` : html`<p>Sin tareas</p>`}
      ${addTemplate(this.prompt, this.addTodo)}
      </div>
    `;
  }
}

customElements.define('todo-view', TodoView);