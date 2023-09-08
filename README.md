# [📦 Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)

As always, please check the documentation linked to the titles to see more information and examples.

## 🥸 What are we using to build a component?

To build a web component we'll be using some native APIs, somo tags, classes and native DOM manipulation:

  - Shadow DOM
  - Custom Element
  - Template
  - Slots
  - HTML Element

## How to see the files

I Organized my files in steps, from the simplest component to the most complex:

  1. [Custom Element](./src/components/customElement.js): This is the simplest way to build a custom element:
    - Create a export class extending HTMlElement.
    - In the constructor call super() and create the node, constructor is the first step in the web component lifecycle.
    - Now in the connectedCallback method (second step in the lifecycle) append the node to your component via `this.append(this.node)`.
    - In the main file import the class of your component and with `customElements.define('my-element', MyElement)` the first parameter is the name of the element (without spaces and in lower case using "-" to separate words), the second parameter is the class you've imported.
    - Use your custom element in the HTML file `<my-elemen></my-elemen>` 
  
  2. [Template](./src/components/template.js): Here we learn how to use the template tag, its function is to give us a structured Element to use as base for the construction of our components:
    - Create and export a class extending HTMLElement.
    - There are many ways to use the template tag, in some cases you'll need to get the template from the HTML, in others you'll need to create it as we do.
    - create a function to build your template using the native DOM manipulation methods as `document.createElement('template')` and `template.content.append(content)` remember always to append the nodes to the template.content, otherwise it won't work, once you have the template return it.
    - Add some styles to the template content with a style tag appended to the template content.
    - What we'll do with the template is to clone its content so we can add it to our component, and that's when we use our render() method:
    ```
      render () {
        const template = this.getTemplate().content.cloneNode(true)
        this.appendChild(template)
      }
    ```
    - Call the render method in the connectedCallback method.
    - Import and create the custom Element in main.js.
    - Use the custom Element in the index.html file.

  3. [ShadowDOM](./src/components/shadowDOM.js): Here we learn about the shadow DOM, this is used to ensure that the code outside your component don't interfere with the styles, js or composition of our components:
    - Create class extending HTMLElement
    - Now we have to link a shadow DOM with our class :`this.attachShadow({ mode: 'open' })` you can do this in a variable or just like the snippet. This link is done in the constructor under the super() calling.
    - Then define the template just like you do in the second file (Template).
    - The only difference is that we don't want to append the template to the component itself, now we have a shadow DOM that works as a container and is attached to the component. So we append the content template clone to our shadowroot `this.shadowRoot.appendChild(template)`. We'll see in upcoming examples that the root of our component is now the shadow root.
    - Call the render method in the connectedCallback method.
    - Import to main and create the new element.

  4. [Slots](./src/components/slots.js): the slots are the way we receive other elements inside our component. I'll focus just into the differences between the previous example and this one.
    - The slot tag have a very specific use case, is used inside our template to reference the place where we want the content inside our Element to be placed.
    - create a new slot tag within our template.
    - Add the name attribute to the slot tag, the value will be the way we connect the element inside our custom element with the slot inside our template.
    - Place the slot tag where you would like to include the element passed as a child in you custom element.
    - Complete the template and the shadow DOM steps as in the previous examples.
    - Create the element and use it as in the previous examples.
    - When using the custom tag, don't forget to set the attribute slot to the child element inside our custom element:
    ```
    <my-slot-element>
      <span slot="header">Wevolution</span>
    </my-slot-element>
    ```
  5. [Attributes](./src/components/attributes.js): To have a really reusable component we need to make it personalizable, at least in the content we want to display inside it, to achieve this functionality we'll receive attributes in our component.
    - Start your component as in the previous example. the difference is that now we are not using slots, instead we'll create some attributes that will be get via `getAttribute('attributeName')` and will be used where needed.
    - In the constructor save in variables the attributes you want to read from your component: `this.title = this.getAttribute('title')`.
    - Then just use it where you want: 
    ```
    const nickName = document.createElement('h1')
    nickName.textContent = this.title
    ```
    - End the component as in the previous examples.

  6. [Attribute Changed](./src/components/attributeChanged.js): Now we will see the way we "listen" the changes on our attributes. This is the perfect time to talk about the life cycle of the component. there are four different moments:
    1. connectedCallback(): is when our component is created in the DOM.
    2. disconnectedCallback(): is when our component is destroyed or removed from the DOM.
    3. attributeChangedCallback(): is when our attribute changes.
    4. adoptedCallback(): I really don't know what is this, but I think the 3 mentioned above are the most used. Check the documentation for more accurate information or at least this [example](https://github.com/mdn/web-components-examples/blob/main/life-cycle-callbacks/main.js).

    - In each of the life cycle callbacks we define what to do in that stage. When the connection is established we call render(), when the component is removed we clean the listeners or another type of subscription, and when an attribute change we want our content to be updated.
    - To listen our attributes we'll have to subscribe our component to listen for changes:
      ```
        static get observedAttributes () {
          return ['title', 'paragraph', 'imgsrc']
        }
      ```
    - First define a static get method called observedAttributes that return an array of the names of the attributes we want to listen for changes.
    - The previous implementation initialize the variables for the attributes so we don't need to declare or initialize them as in the previous example, just get the like this: `nickName.textContent = this.getAttribute('title')`.
    - Then create the method `attributeChangedCallback (name, oldValue, newValue){...}` it receives the name of the attribute, the old value and the new value. This method is called before the connection so the data is null the first time in case you have a console.log to check the data.
    - The method will be called each time any of the attributes are changed and its called once for each attribute, so if you have more than one attribute make sure to have an if or any way to check the value changed before doing anything. For instance check this snippet:
    ```
     attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'title') {
        const title = this.shadowRoot.querySelector('.title')
        title && (title.textContent = newValue)
      } else if (name === 'paragraph') {
        const paragraph = this.shadowRoot.querySelector('.paragraph')
        paragraph && (paragraph.textContent = newValue)
      } else if (name === 'imgsrc') {
        const img = this.shadowRoot.querySelector('.img')
        img && newValue && img.setAttribute('src', newValue)
      }
    }

    ```
    - See how we have to access an element of our component via `this.shadowRoot.querySelector(selector)`. that's because the root of our component is not document or window, is the shadowDOM we create to wrap our component.
    - Then just end the component as in the other examples with your styles and structures.

## Styles
### :host

- :host is a pseudo-class used to define the styles of your component itself, not the inside elements but the case of your component. It's like the root styles, there you will define the custom properties that will let your component user to stilize and customize your component.
- :host-context(fatherElement) is a way to give styles to your component according to the father element. In the next example we are styling the component that is inside a Section element with the class "card". It may be useful in certain situations but is good to know that we have this option.
```
  :host-context(section[class*="card"]) {
          background-color: var(--dark-background-color);
        }

```

## Conclusions

- In some of my projects I wrapped code in a function that will return an HTML Element created with JS, the function will receive parameters that will be used to personalize the content of my element, the difference with Custom Element is that ofcourse I end up returning an HTML Element as a Section or a Header or a Main, not an HTML Element created by me. I thought that a web component were like what I was doing, but it ended up being something really different, both in the way it's done and in the way is used.

- To be honest, I don't think I'll be using web components frequently, but is always a good thing to know about different ways of doing things.

- I don't like to write Css in JavaScript, specially because we don't have hints, but probably is not a big deal unless you are working in a big component which I think is not a good idea, is better to divide everything in little components.

- I definitely appreciate much more now the React components, they are much more easy to read and create.





