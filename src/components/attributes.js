// < Usando Attributes

export class MyAttributeElement extends HTMLElement {
  constructor () {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
    this.title = this.getAttribute('title')
    this.paragraph = this.getAttribute('paragraph')
    this.imgSrc = this.getAttribute('imgsrc')
  }

  getTemplate () {
    const template = document.createElement('template')
    const header = document.createElement('header')
    const profile = document.createElement('div')
    profile.classList.add('profile')

    const nickName = document.createElement('h1')
    nickName.textContent = this.title

    const p = document.createElement('p')
    p.textContent = this.paragraph

    const figure = document.createElement('figure')
    const img = document.createElement('img')
    img.setAttribute('src', this.imgSrc)
    figure.append(img)
    profile.append(figure, nickName)
    header.append(profile, p)

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
        justify-content: space-between;
        align-items: center;
        background-color: red;
        border-radius: 15px;
        padding: 15px;
        margin-top: 10px;
      }
      .profile {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      h1 {
        color: cyan;
        font-family: monospace;
        margin: 0;
      }
      p {
        margin: 0;
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
}
