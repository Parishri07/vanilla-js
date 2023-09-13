function generateMain(category) {
    const container = document.createElement('div')
    container.setAttribute('id', 'container')
  
    const ul = document.createElement('ul')
    ul.setAttribute('id', 'category-list')
  
    const categories = Object.keys(todos)
  
    categories.forEach(category => {
      const li = document.createElement('li')
      li.classList.add('category')
      li.addEventListener('click', event => {
        Router.go(category)
      })
      li.textContent = category
  
      ul.appendChild(li)
    })
  
    container.appendChild(ul)
  
    const form = document.createElement('form')
    form.setAttribute('id', 'todo-form')
  
    const input = document.createElement('input')
    input.setAttribute('placeholder', 'add a new todo')
    input.setAttribute('type', 'text')
    const button = document.createElement('button')
    button.textContent = 'Add'
    button.setAttribute('type', 'submit')
  
    form.addEventListener('submit', e => {
      e.preventDefault()
  
      DB.addTodo(input.value, category)
      Router.go(category)
    })
  
    form.appendChild(input)
    form.appendChild(button)
  
    container.appendChild(form)
  
    const list = document.createElement('div')
    list.setAttribute('id', 'todo-list')
  
    todos[category].forEach(todo => {
      const todoItem = document.createElement('div')
      todoItem.classList.add('todo-item')
  
      const span = document.createElement('span')
      const btn = document.createElement('button')
  
      span.textContent = todo
      btn.textContent = 'delete'
  
      span.classList.add('todo-text')
      btn.classList.add('delete-button')
  
      btn.addEventListener('click', () => {
        DB.deleteTodo(todo, category)
      })
  
      todoItem.appendChild(span)
      todoItem.appendChild(btn)
  
      list.appendChild(todoItem)
    })
  
    container.appendChild(list)
  
    return container
  }
  
  const Router = {
    init() {
      const uglyAnchors = document.querySelectorAll('a')
      uglyAnchors.forEach(anchor => {
        anchor.addEventListener('click', event => {
          event.preventDefault()
          this.go(anchor.getAttribute('href'))
        })
      })
  
      let currentPath = location.pathname
      Router.go(currentPath)
    },
  
    go(route) {
      console.log(`Going to ${route}`)
  
      history.pushState({ route }, null, route)
  
      let elem = null
  
      switch (route) {
        case '':
        case '/':
          elem = generateMain('default')
          break
        case '/about':
          const h1 = document.createElement('h1')
          h1.textContent = 'About'
          elem = h1
          break
        default:
          let category = route.replace('/', '')
          elem = generateMain(category)
      }
  
      document.querySelector('main').innerHTML = ''
      document.querySelector('main').appendChild(elem)
    },
  }
  
  export default Router