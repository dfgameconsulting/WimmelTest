setInterval(() => {
    tippy('[data-tippy-content]'); 
}, 2000);
//#options-glossar

tippy('#options-glossar', {
    content: 'Glossar',
    placement: 'left',
    theme: 'wimmel'
  });
  tippy('#options-volume', {
    content: 'Lautstärke',
    placement: 'left',
    theme: 'wimmel'
  });
    tippy('#sort', {
    content: 'Kategorie / A-Z',
    placement: 'left',
    theme: 'wimmel'
  });
  tippy('#studium', {
    content: 'Studium',
    placement: 'right',
    theme: 'wimmel',
    distance: '-20px'
  });
  tippy('#ausbildung', {
    content: 'Ausbildung',
    placement: 'right',
    theme: 'wimmel',
    distance: '-20px'
  });
  tippy('#lebenskrisen', {
    content: 'Lebenskrisen',
    placement: 'right',
    theme: 'wimmel',
    distance: '-20px'
  });
  tippy('#erwachsen-werden', {
    content: 'Erwachsen werden',
    placement: 'right',
    theme: 'wimmel',
    distance: '-20px'
  });
  tippy('.close-level', {
    content: 'Zurück zur Stadtviertel Auswahl',
    placement: 'right',
    theme: 'wimmel'
  });
  
  tippy('.switchInventory', {
    content: 'Inventar ausblenden / einblenden',
    placement: 'top',
    theme: 'wimmel'
  });

  if (document.querySelector('.lupe') != 'undefined') {
    tippy('.lupe', {
      content: 'Finde ein Versteck in jedem Stadtteil',
      placement: 'left',
      theme: 'wimmel'
    });
    tippy('.hint', {
      content: 'Hilfe beim Suchen',
      placement: 'left',
      theme: 'wimmel'
    });
  }


  tippy.setDefaultProps({
    delay: 50,
    theme: 'wimmel'
  });