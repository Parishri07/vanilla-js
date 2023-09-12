const Router = {
    init() {
        const uglyAnchors = document.querySelectorAll('a')
        uglyAnchors.forEach(anchor => {
            anchor.addEventListener('click', (event) => {
                event.preventDefault()
                this.go(anchor.getAttribute('href'))
            })
        })

        let currentPath = location.pathname
        Router.go(currentPath)
    },

    go(route) {
        console.log(`Going to ${route}`)

        history.pushState({route}, null, route)

        let elem = null

        switch (route) {
            case '':
            case '/':
                elem = 'main'
                break;
            case '/about':
                elem = `<h1>About</h1>`
                break;
            default:
                let category = route.replace('/','')
                elem = `<p>you're at ${category}</p>`
        }

        document.querySelector('main').innerHTML = elem
    }
}

export default Router