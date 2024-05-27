
class Glossar {
  constructor() {
    this.init()
  }

  init = async () => {
    let glossarWrap = document.querySelector('#glossar-html')
    let glossarNavWrap = document.querySelector('#unter-kat')

    this.glossarJSON = await this.loadJSON()

    this.glossarJSON.forEach(category => {

      let wrap = document.createElement('div')
      wrap.id = `#glossar-` + category.category

      let wrapHeadline = document.createElement('h1')
      wrapHeadline.textContent = category.category
      wrap.appendChild(wrapHeadline)


      category.subcategories.forEach(subcategory => {
        let subcatNavEntry = document.createElement('div')
        subcatNavEntry.insertAdjacentHTML('beforeend', '<p>' + subcategory.name + '</p>')
        subcatNavEntry.id = subcategory.id + '-click'
        subcatNavEntry.onclick = (e) => {
          e.preventDefault()
          document.querySelector('#' + subcategory.id).scrollIntoView({ behavior: "smooth" })
        }

        glossarNavWrap.appendChild(subcatNavEntry)

        let subcatWrap = document.createElement('div')
        subcatWrap.id = subcategory.id

        let subcatWrapHeadline = document.createElement('h2')
        subcatWrapHeadline.textContent = subcategory.name

        subcatWrap.appendChild(subcatWrapHeadline)

        let subcatContent = document.createElement('p')
        subcatContent.textContent = subcategory.content
        subcatWrap.appendChild(subcatContent)
        
        subcategory.additional_informations.forEach(ai => {
          let additionalInfoList = document.createElement('ul')
          additionalInfoList.insertAdjacentHTML('beforeend','<li><b>'+ai.label+'</b></li>')
          
          ai.content.forEach(aic => {
            if(aic.type === 'text'){
              additionalInfoList.insertAdjacentHTML('beforeend','<li><p>'+aic.text+'</p></li>')
            }else if(aic.type === 'link'){
              additionalInfoList.insertAdjacentHTML('beforeend','<li><a href="'+aic.text+' target="blank">'+aic.label+'</a></li>')
            }
          })

          subcatWrap.appendChild(additionalInfoList)

        })

        
        wrap.append(subcatWrap)
      });
      glossarWrap.appendChild(wrap)
    });

  }

  loadJSON = async () => {
    const response = await fetch('./gamejs/glossar.json');
    return await response.json();
  }
}

new Glossar()