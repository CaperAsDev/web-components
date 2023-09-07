// < AttributeChangedCallback

export class MyAttributeChangedElement extends HTMLElement {
  static get observedAttributes () {
    return ['title', 'paragraph', 'imgsrc']
  }

  constructor () {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
  }

  getTemplate () {
    const template = document.createElement('template')
    const profile = document.createElement('div')
    profile.classList.add('profile')

    const nickName = document.createElement('h1')
    nickName.classList.add('title')
    nickName.textContent = this.getAttribute('title')

    const p = document.createElement('p')
    p.classList.add('paragraph')
    p.textContent = this.getAttribute('paragraph')

    const figure = document.createElement('figure')
    const img = document.createElement('img')
    img.classList.add('img')
    img.setAttribute('src', this.getAttribute('imgSrc'))
    figure.append(img)
    profile.append(figure, nickName)

    template.content.append(profile, p, this.getStyles())

    return template
  }

  getStyles () {
    const style = document.createElement('style')

    style.textContent = `
      :host *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      :host {
        --font-size-l: 2rem; 
        --primary-color: purple;
        --secondary-color: orange;
        --dark-background-color: black;
        width: 100%;
        height: fit-content;
        display: flex;
        align-items: center;
        justify-content: space-around;
        background-color: var(--primary-color);
        gap: 10px;
        padding: 10px;
        flex-wrap: wrap;
      }
      :host-context(section[class*="card"]) {
        background-color: var(--dark-background-color);
      }
      .profile {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
      }
      h1 {
        color: var(--secondary-color);
        font-family: monospace;
        margin: 0;
        font-size: var(--font-size-l);
      }
      p {
        justify-self: flex-end;
        font-family: sans-serif;
        color: #eee;
      }
      figure {
        height: 60px;
        width: 60px;
        border-radius: 50%;
        overflow: hidden;
      }
      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
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

  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'title') {
      const title = this.shadowRoot.querySelector('.title')
      title && (title.textContent = newValue)
    } else if (name === 'paragraph') {
      const paragraph = this.shadowRoot.querySelector('.paragraph')
      paragraph && (paragraph.textContent = newValue)
      // console.log(paragraph);
      // console.log(newValue);
    } else if (name === 'imgsrc') {
      const img = this.shadowRoot.querySelector('.img')
      img && newValue && img.setAttribute('src', newValue)
    }
    // console.log(name);
  }
}

const changeNameBtn = document.querySelector('.change-name')
changeNameBtn.addEventListener('click', (e) => {
  e.preventDefault()
  const card = document.querySelector('.profile-card')
  card.setAttribute('title', 'Capipop')
})

const changeJobBtn = document.querySelector('.change-job')
changeJobBtn.addEventListener('click', (e) => {
  e.preventDefault()
  const card = document.querySelector('.profile-card')
  card.setAttribute('paragraph', 'Illustrator')
})

const changeImgBtn = document.querySelector('.change-img')
changeImgBtn.addEventListener('click', (e) => {
  e.preventDefault()
  const input = document.querySelector('#imgSrc')
  const card = document.querySelector('.profile-card')
  card.setAttribute('imgSrc', input.value)
  input.value = ''
})
// <Con la pseudoclase :host estilizamos nuestro componente, podemos aplicar los otros selectores (de atributos [], o de contexto, ademas se usan los parentesis para agragar selectores al ":host")

// ? :host(.footer)--- Este funcionaria en caso de que nuesto componente incluyera a clase "footer"
// ? :host-context(h1)--- Entre parentesis va el elemento padre de nuesto componente
// ? :host([yellow])--- Aplicaria si el componente tuviera un atributo yellow

// ? Para estilizar componentes desde afuera debemos definir dentro de la raiz de nuestro componente ":host" unas variables que seran enlazadas a los valores que deseamos permitir personalizar por el consumidor del componente.

// ? Existe un pseudo elemento llamado "::lotted" que sirve para estilar los elementos que vengan dentro de tu componente. Es util unicamente cuando trabajas con slots(asi es como captas el contendio) y con shadow DOM.
