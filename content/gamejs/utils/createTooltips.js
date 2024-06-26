setInterval(() => {
    tippy('[data-tippy-content]'); 
}, 5000);

//#options-glossar

tippy('#options-glossar', {
    content: 'Glossar',
    placement: 'left'
  });
  tippy('#options-volume', {
    content: 'Lautstärke',
    placement: 'left'
  });

  tippy('#BurgerInventory', {
    content: 'Burger',
    placement: 'top'
  });
 

  console.log(objects)