// < Shadow DOM
// ? Lo que soluciona el shadow dom es el conflicto que podria haber con estilos o estructuras de marcado al momento que incluir un componente en un proyecto.

// ? El shadow dom encapsula y aisla el componente

export class MyShadowElement extends HTMLElement {
  constructor () {
    super()
    //! Este Shadow Root sera ahora la fuente desde donde referenciaremos cualquier nodo dentro del componente. Si quiero obtener un elemento usaria shadowRoot.getElementbyId("id") en lugar de hacer referencia al document...
    const shadowRoot = this.attachShadow({ mode: 'open' })
  }

  getTemplate () {
    const template = document.createElement('template')
    const header = document.createElement('header')
    const title = document.createElement('h1')
    title.innerText = 'My web Component'

    header.append(title)

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
        display: grid;
        place-items: center;
        background-color: orange;
        border-radius: 3px;
        padding: 15px;
      }
      h1 {
        color: purple;
        font-family: monospace;
        margin: 0;
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
