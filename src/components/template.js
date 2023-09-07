// < Template

export class MyTemplateElement extends HTMLElement {
  constructor () {
    super()
  }

  getTemplate () {
    const template = document.createElement('template')
    const main = document.createElement('main')
    const title = document.createElement('h1')
    title.innerText = 'My Template'
    main.append(title)
    template.content.append(main)

    template.innerHTML += this.getStyles()

    return template
  }

  getStyles () {
    return `
      <style>
        main {
          width: 100%;
          height: 5rem;
        }
        h1 {
          background-color: cyan;
          color: orange;
          padding: 15px;
          margin: 0px;
        }
      </style>
    `
  }

  render () {
    const template = this.getTemplate().content.cloneNode(true)
    this.appendChild(template)
  }

  connectedCallback () {
    this.render()
  }
}
