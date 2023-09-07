// < Custom Elements
export class MyElement extends HTMLElement {
  constructor () {
    super()
    //! Se incializa lo que se guarda en memoria
    this.p = document.createElement('p')
  }

  connectedCallback () {
    //! Se agrega como nodo a nuestro custom Component
    this.p.textContent = 'Hola mundo!!'
    this.append(this.p)
    // console.log(this);
  }
}
