const DB = {
  init() {
    // Initialize the database with default values if it's empty.
    const defaultValues = {
      default: ['default todo'],
    };

    const todos = JSON.parse(localStorage.getItem('todos'));

    if (!todos) {
      // If there are no todos in localStorage, save the default ones.
      this.saveTodos(defaultValues);
    }

    // Make the todos data accessible via the `window` object.
    window.todos = todos;
  },

  getTodos() {
    // Retrieve todos from localStorage and parse it into an object.
    return JSON.parse(localStorage.getItem('todos'));
  },

  saveTodos(todos) {
    // Save the todos object to localStorage after converting it to a JSON string.
    localStorage.setItem('todos', JSON.stringify(todos));
  },

  addTodo(todo, category) {
    const todos = this.getTodos();
    if (!todos[category]) {
      // If the category doesn't exist, create an empty array for it.
      todos[category] = [];
    }

    // Add the new todo to the specified category.
    todos[category].push(todo);

    // Save the updated todos object to localStorage.
    this.saveTodos(todos);
  },

  deleteTodo(todo, category) {
    const todos = this.getTodos();
    if (!todos[category]) {
      // If the category doesn't exist, return false (no deletion).
      return false;
    }

    // Use the filter method to remove the specified todo from the category.
    todos[category] = todos[category].filter((td) => {
      if (todo == td) return false;
      else return true;
    });

    // Save the updated todos object to localStorage.
    this.saveTodos(todos);
  },
};

export default DB;
