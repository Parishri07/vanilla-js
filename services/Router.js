// This function generates the main content for a given category.
function generateMain(category) {
  // Create a container div.
  const container = document.createElement('div');
  container.setAttribute('id', 'container');

  // Create an unordered list for categories.
  const ul = document.createElement('ul');
  ul.setAttribute('id', 'category-list');

  // Get the categories from a todos object (not shown here).
  const categories = Object.keys(todos);

  // Loop through categories to create list items.
  categories.forEach(category => {
    const li = document.createElement('li');
    li.classList.add('category');
    li.addEventListener('click', event => {
      // When clicked, trigger a route change using the Router.
      Router.go(category);
    });
    li.textContent = category;

    ul.appendChild(li);
  });

  container.appendChild(ul);

  // Create a form for adding new todos.
  const form = document.createElement('form');
  form.setAttribute('id', 'todo-form');

  const input = document.createElement('input');
  input.setAttribute('placeholder', 'add a new todo');
  input.setAttribute('type', 'text');
  const button = document.createElement('button');
  button.textContent = 'Add';
  button.setAttribute('type', 'submit');

  form.addEventListener('submit', e => {
    e.preventDefault();

    // Add a new todo using the DB object (not shown here).
    DB.addTodo(input.value, category);
    // Trigger a route change to refresh the content.
    Router.go(category);
  });

  form.appendChild(input);
  form.appendChild(button);

  container.appendChild(form);

  // Create a container for displaying the list of todos.
  const list = document.createElement('div');
  list.setAttribute('id', 'todo-list');

  // Loop through todos in the selected category.
  todos[category].forEach(todo => {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');

    const span = document.createElement('span');
    const btn = document.createElement('button');

    span.textContent = todo;
    btn.textContent = 'delete';

    span.classList.add('todo-text');
    btn.classList.add('delete-button');

    btn.addEventListener('click', () => {
      // Delete a todo using the DB object (not shown here).
      DB.deleteTodo(todo, category);
    });

    todoItem.appendChild(span);
    todoItem.appendChild(btn);

    list.appendChild(todoItem);
  });

  container.appendChild(list);

  return container;
}

// Router object for handling page navigation.
const Router = {
  init() {
    // Add click event listeners to all anchor tags.
    const uglyAnchors = document.querySelectorAll('a');
    uglyAnchors.forEach(anchor => {
      anchor.addEventListener('click', event => {
        event.preventDefault();
        // When clicked, navigate to the specified route.
        this.go(anchor.getAttribute('href'));
      });
    });

    // Initialize the router with the current path.
    let currentPath = location.pathname;
    Router.go(currentPath);
  },

  go(route) {
    console.log(`Going to ${route}`);

    // Use HTML5 history API to update the URL.
    history.pushState({ route }, null, route);

    let elem = null;

    switch (route) {
      case '':
      case '/':
        // Generate main content for the default route.
        elem = generateMain('default');
        break;
      case '/about':
        // Create an h1 element for the about page.
        const h1 = document.createElement('h1');
        h1.textContent = 'About';
        elem = h1;
        break;
      default:
        // Extract the category from the route and generate content.
        let category = route.replace('/', '');
        elem = generateMain(category);
    }

    // Clear the existing content and append the new content.
    document.querySelector('main').innerHTML = '';
    document.querySelector('main').appendChild(elem);
  },
};

// Export the Router object for use in other parts of the code.
export default Router;
