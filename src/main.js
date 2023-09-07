import { MyAttributeChangedElement } from './components/attributeChanged'
import { MyAnimeCard } from './components/myAnimeCard'

/* import { MyElement } from './components/customElement'
import { MyTemplateElement } from './components/template'
import { MyShadowElement } from './components/shadowDOM'
import { MySlotElement } from './components/slots'
import { MyAttributeElement } from './components/attributes' */

/* customElements.define('my-element', MyElement)
customElements.define('my-template-element', MyTemplateElement)
customElements.define('my-shadow-element', MyShadowElement)
customElements.define('my-slot-element', MySlotElement)
customElements.define('my-attribute-element', MyAttributeElement) */

customElements.define(
  'my-attribute-changed-element',
  MyAttributeChangedElement
)

customElements.define(
  'my-anime-card',
  MyAnimeCard
)
