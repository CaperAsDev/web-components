/* eslint-disable no-undef */
import { getAnime } from '../apiConnection'

export class MyAnimeCard extends HTMLElement {
  static get observedAttributes () {
    return ['anime-title']
  }

  constructor () {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
  }

  template () {
    const template = document.createElement('template')
    const figure = document.createElement('figure')
    const img = document.createElement('img')
    img.classList.add('anime-img')
    const infoContainer = document.createElement('div')
    infoContainer.classList.add('anime-info')
    const title = document.createElement('h2')
    title.classList.add('anime-title')
    const genres = document.createElement('p')
    genres.classList.add('anime-genres')
    const release = document.createElement('p')
    const year = document.createElement('span')
    year.classList.add('anime-year')
    const season = document.createElement('span')
    season.classList.add('anime-season')
    const description = document.createElement('p')
    description.classList.add('anime-synopsis')

    release.append(year, season)
    infoContainer.append(title, genres, release, description)
    figure.appendChild(img)
    template.content.append(figure, infoContainer, this.getStyles())

    return { template, img, title, genres, year, season, description }
  }

  getStyles () {
    const styles = document.createElement('style')
    styles.textContent = `
    :host *{
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: sans-serif;
      font-size: 1rem;
    }
    :host{
      min-width: 300px;
      width: 400px;
      max-width: 500px;
      height: fit-content;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 15px;
      overflow: hidden;
      border: 1px solid darkcyan;
    }
    figure {
      width: 400px;
      min-width: 300px;
      max-width: 100%;
      height: fit-content;
    }
    .anime-img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .anime-info{
      padding: 10px;
      display:flex;
      flex-direction: column;
      gap: 10px;
    }
    .anime-title{
      font-size: 1.5rem;
      text-align: center;
      padding-bottom: 5px;
      color: darkcyan;
      margin-bottom: 5px;
    }
    .anime-genres{
      display: flex;
      justify-content: space-evenly;
      align-items: center;
    }
    .anime-year{
      font-weight: bold;
      margin-right: 10px;
    }
    .anime-synopsis{
      text-align: justify;
    }

    `
    return styles
  }

  async setData ({ template, img, title, genres, year, season, description }, animeName) {
    const data = await getAnime(animeName)
    const animeInfo = data[0]
    img.src = animeInfo.images.jpg.large_image_url
    title.textContent = animeInfo.title
    description.textContent = animeInfo.synopsis
    const seasonArray = animeInfo.season.trim().split('')
    const firstLetter = seasonArray.splice(0, 1)[0].toUpperCase()
    const newSeason = [...firstLetter, ...seasonArray].join('')
    season.textContent = newSeason
    year.textContent = animeInfo.year
    const genresList = animeInfo.genres.map((genre) => {
      const genreSpan = document.createElement('span')
      genreSpan.classList.add('genre')
      genreSpan.textContent = genre.name
      return genreSpan
    })
    genres.innerHTML = ''
    genres.append(...genresList)

    console.log(template.content)

    return template || null
  }

  render () {
    const animeName = this.getAttribute('anime-title')
    this.setData(this.template(), animeName)
      .then(res => {
        const templateClone = res.content.cloneNode(true)
        this.shadowRoot.appendChild(templateClone)
      })
  }

  connectedCallback () {
    this.render()
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'anime-title') {
      const title = this.shadowRoot.querySelector('.anime-title')
      const year = this.shadowRoot.querySelector('.anime-year')
      const season = this.shadowRoot.querySelector('.anime-season')
      const genres = this.shadowRoot.querySelector('.anime-genres')
      const description = this.shadowRoot.querySelector('.anime-synopsis')
      const img = this.shadowRoot.querySelector('.anime-img')

      img &&
      this.setData({ img, title, genres, year, season, description }, newValue)
    }
  }
}
