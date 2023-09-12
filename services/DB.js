const DB = {
    init(){
        const defaultValues = {
            default: ['default todo'],
        }

        const todos = JSON.parse(localStorage.getItem('todos'))

        if(!todos){
         this.saveTodos(defaultValues)
        }

        window.todos = todos
    },

    getTodos(){
        return JSON.parse(localStorage.getItem('todos'))
    },

    saveTodos(todos){
        localStorage.setItem('todos', JSON.stringify(todos))
    },

    addTodo(todo, category){
        const todos = this.getTodos()
        if(!todos[category]){
            todos[category] = []
        }

        todos[category].push(todo)

        this.saveTodos(todos)
    },

    deleteTodo(todo, category){
        const todos = this.getTodos()
        if(!todos[category]){
            return false
        }
        todos[category] = todos[category].filter((td)=>{
            if(todo == td) return false
            else return true
        })

        this.saveTodos(todos)
    }
}

export default DB