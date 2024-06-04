
class Glossar {
  constructor() {
    this.init()
    this.sortType = 'cat'
    this.activeChapter = null
    this.activeContent = null
    this.mainCategory = null
    this.glossarChapters = []
    this.glossarContent = []
    this.glossarCategories = []
  }

  init = async () => {
    /**
     * Set the glossar wrapper and glossar navigation wrapper
     */
    let glossarWrap = document.querySelector('#glossar-html')
    let glossarNavWrap = document.querySelector('#unter-kat')
    let glossarMainNavWrap = document.querySelector('#haupt-kat')

    /**
     * Load the glossar json file (located in gamejs/glossar.json)
     */
    this.glossarJSON = await this.loadJSON()


    /**
     * Loop over the json, get all main categories
     */
    this.glossarJSON.forEach(category => {

      /**
       * Main navigation
       */
      let mainNavEntry = document.createElement('div')
      mainNavEntry.id = category.category.toLowerCase()
      if (mainNavEntry.id === 'studium') {
        mainNavEntry.classList.add('active')
      }
      let mainNavEntryIcon = document.createElement('div')
      mainNavEntryIcon.classList.add('mainNavEntryIcon')

      mainNavEntry.appendChild(mainNavEntryIcon)

      glossarMainNavWrap.appendChild(mainNavEntry)

      this.glossarChapters.push(category.category.toLowerCase())
      this.glossarContent.push(`glossar-` + category.category.toLowerCase())
      this.glossarCategories.push(`subcat-` + category.category.toLowerCase())

      if(this.activeChapter == null){
        this.activeChapter = category.category.toLowerCase()
      }

      /**
       * Main wrapper for the glossar on the right
       */
      let wrap = document.createElement('div')
      wrap.id = `glossar-` + category.category.toLowerCase()
      wrap.style.display = category.active ? 'block' : 'none'

      /**
       * Navigation wrapper for the glossar chapters
       */
      let subCatNavWrap = document.createElement('div')
      subCatNavWrap.id = `subcat-` + category.category.toLowerCase()
      subCatNavWrap.style.display = category.active ? 'block' : 'none'

      /**
       * Glossar headlines
       */
      let wrapHeadline = document.createElement('h1')
      wrapHeadline.textContent = category.category
      wrap.appendChild(wrapHeadline)


      /**
       * Loop over all subcategories
       */
      category.subcategories.forEach(subcategory => {
        /**
         * Creates a chapter
         */
        let subcatNavEntry = document.createElement('div')
        subcatNavEntry.insertAdjacentHTML('beforeend', '<span>' + subcategory.name + '</span>')
        subcatNavEntry.id = subcategory.id + '-click'
        subcatNavEntry.className = 'subCatNavEntry'
        subcatNavEntry.onclick = (e) => {
          e.preventDefault()
          document.querySelector('#' + subcategory.id).scrollIntoView({ behavior: "smooth" })
        }

        subCatNavWrap.appendChild(subcatNavEntry)

        /**
         * Creates the topic wrapper for the content on the right
         */
        let subcatWrap = document.createElement('div')
        subcatWrap.id = subcategory.id

        /**
         * Creates the subheadline of each subtopic
         */
        let subcatWrapHeadline = document.createElement('h2')
        subcatWrapHeadline.textContent = subcategory.name

        subcatWrap.appendChild(subcatWrapHeadline)

        /**
         * Creates the paragraphs for the content on the right
         */
        let subcatContent = document.createElement('p')
        subcatContent.innerHTML = subcategory.content
        subcatWrap.appendChild(subcatContent)

        /**
         * Loop over additional information from each subtopic
         */
        subcategory.additional_informations.forEach(ai => {
          let additionalInfoList = document.createElement('ul')
          additionalInfoList.insertAdjacentHTML('beforeend', '<li><b>' + ai.label + '</b></li>')


          ai.content.forEach(aic => {
            /**
             * Here were're checking if the additional information is a normal text info or a link
             */
            if (aic.type === 'text') {
              additionalInfoList.insertAdjacentHTML('beforeend', '<li><p>' + aic.text + '</p></li>')
            } else if (aic.type === 'link') {
              additionalInfoList.insertAdjacentHTML('beforeend', '<li><a href="' + aic.text + ' target="blank">' + aic.label + '</a></li>')
            }
          })

          subcatWrap.appendChild(additionalInfoList)

        })


        wrap.append(subcatWrap)
      });
      glossarNavWrap.appendChild(subCatNavWrap)
      glossarWrap.appendChild(wrap)
      document.querySelector('#' + category.category.toLowerCase()).onclick = (e) => {
        this.changeChapter(e.currentTarget.id)
        document.getElementById('cat-name').textContent = category.category
      }



    });

    document.getElementById('sort').onclick = () => {
      this.sort()
    }
  }

  changeChapter = (id) => {
    if (this.activeChapter != null) {
      document.getElementById(this.activeChapter).classList.remove('active')
      document.getElementById('subcat-' + this.activeChapter).style.display = 'none'
      document.getElementById('glossar-' + this.activeChapter).style.display = 'none'
    }

    this.activeChapter = id
    document.getElementById(this.activeChapter).classList.add('active')
    document.getElementById('subcat-' + this.activeChapter).style.display = 'block'
    document.getElementById('glossar-' + this.activeChapter).style.display = 'block'
    // this.changeZyndr3lla()
  }

  sort = () => {
    if (this.sortType === 'cat') {
      this.sortType = 'az'

      this.glossarChapters.forEach((element) => {
        document.getElementById(element).className = 'inactive'
      })

      document.getElementById('sort').textContent = 'A-Z'
      this.glossarCategories.forEach((element, index) => {
        document.getElementById(element).style.display = 'block'
      })

      this.glossarContent.forEach((element, index) => {
        document.getElementById(element).style.display = 'block'
      })
    } else if(this.sortType === 'az') {
      this.sortType = 'cat'

      this.glossarChapters.forEach((element) => {
        document.getElementById(element).className = ''
      })

      document.getElementById('sort').textContent = 'Kategorie'
      this.glossarCategories.forEach((element, index) => {
        document.getElementById(element).style.display = 'none'
      })
  
      this.glossarContent.forEach((element, index) => {
        document.getElementById(element).style.display = 'none'
      })

      document.getElementById(this.activeChapter).className = 'active'
      document.getElementById('subcat-' + this.activeChapter).style.display = 'block'
      document.getElementById('glossar-' + this.activeChapter).style.display = 'block'
    }
  }

  changeZyndr3lla = () => {

  }

  loadJSON = async () => {
    const response = await fetch('./gamejs/glossar.json');
    return await response.json();
  }
}

new Glossar()