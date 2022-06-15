export let TodoListDataService {
    static state = [];

    static initilalizeState(state) {
        this.state = state;
    }

    static AddTodoItem(id, value, checked) {
        this.state.push({
            id: id,
            value: value,
        });
    }

    static UpdateTodoItem(id, value) {
        let todoItem = this.state.find((t) => t.id === id);
        todoItem.value = value;
    }

    static DeleteTodoItem(id) {
        this.state = this.state.filter((t) => t.id !== id);
    }
}
