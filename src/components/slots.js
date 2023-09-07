// < Usando Slots

export class MySlotElement extends HTMLElement {
  constructor () {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
  }

  getTemplate () {
    const template = document.createElement('template')
    const header = document.createElement('header')
    const title = document.createElement('h1')
    const p = document.createElement('p')

    const parragraphSlot = document.createElement('slot')
    parragraphSlot.setAttribute('name', 'parragraph')
    parragraphSlot.textContent = 'My default parragraph'

    const headerSlot = document.createElement('slot')
    headerSlot.setAttribute('name', 'header')
    headerSlot.textContent = 'My default header'

    p.append(parragraphSlot)
    title.append(headerSlot)

    header.append(title, p)

    template.content.append(header, this.getStyles())

    return template
  }

  getStyles () {
    const style = document.createElement('style')

    style.textContent = `
      header {
        box-sizing: border-box;
        width: 100%;
        height: 5rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background-color: purple;
        border-radius: 15px;
        padding: 15px;
        margin-top: 10px;
      }
      h1 {
        color: orange;
        font-family: monospace;
        margin: 0;
      }
      p {
        margin: 0;
        font-family: sans-serif;
        font-weight: bold;
        font-size: 1.5rem;
        color: #eee;
      }
    `
    return style
  }

  render () {
    const template = this.getTemplate().content.cloneNode(true)
    this.shadowRoot.appendChild(template)
  }

  connectedCallback () {
    this.render()
  }
}
