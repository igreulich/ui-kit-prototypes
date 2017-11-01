/* So 4 functions: filter drop down, show dropdown, update text input, and close drop down */

;(function() {
  // Displays markup on page
  var renderMarkUp = function(array, parent) {
    for (let item of array) {
      parent.appendChild(item);
    }
    parent.classList.add('hidden');
    generateLabel('Type Ahead Dropdown Text Input');
  };

  // Generates Markup to be Displayed in renderMarkUp
  var generateMarkUp = function(data, objProperty) {
    var options = data.map(function(el, index){
      // input is probably not the best element type to use
      var optionElement = document.createElement('li');
      optionElement.className = 'typeahead__option';
      optionElement.addEventListener('click', addOptionToInput);
      optionElement.tabIndex = -1;
      if (typeof el === 'string') {
        optionElement.innerHTML = el;
      } else if (typeof el === 'object') {
        // deal with an array of objects
        optionElement.innerHTML = el[objProperty];
      }
      return optionElement;
    });
    return options;
  }

// Generating the label for the Input
  var generateLabel = function(label) {
    document.getElementsByClassName('typeahead__label')[0].innerHTML = label;
  };

  // Shows/Hides Markup
  var removeClass = function(el, className) {
    el.classList.remove(className);
  };

  var addClass = function(el, className) {
    el.classList.add(className);
  };

  var inputHandler = function(event) {
    var criteria = event.target.value;
    var optionsContainer = event.target.parentNode.querySelector('.typeahead__options');

    switch (event.keyCode) {
      // down arrow
      case 40:
        goToNext(optionsContainer);
        break;
      // up arrow
      case 38:
        goToPrevious(optionsContainer);
        break;
      // enter
      case 13:
        enterOptionToInput();
        break;
      default:
        filterDropDownOptions(optionsContainer, criteria);
        break;
    }
  };

  var moveSelectedClass = function(array, incrementer){
    // iterates thru an array
    // index starting point is items.length if less than 0
    // index starting point is 0
    // trying to implement this on goToNext and goToPrevious
    var startingPoint;
    var endingPoint;

    if (incrementer >= 0){
      startingPoint = 0
      endingPoint = array.length - incrementer;
    } else {
      startingPoint = array.length - 1;
      endingPoint = 0 - incrementer;
    }

    for (var i = startingPoint; i < endingPoint; i = i + incrementer) {
      if (array[i].classList.contains('selected')) {
        array[i].classList.remove('selected');
        array[i + incrementer].classList.add('selected');
        break;
      }
    }
  };

  var goToNext = function(optionsContainer) {
    removeClass(event.target.parentElement.querySelector('.typeahead__options'), 'hidden');
    var items = optionsContainer.querySelectorAll('.typeahead__option:not(.hidden)');
    if (optionsContainer.querySelectorAll('.typeahead__option.selected').length > 0){
      moveSelectedClass(items, 1);
    } else {
      items[0].classList.add('selected');
    }
  };

  var goToPrevious = function(optionsContainer) {
    var items = optionsContainer.querySelectorAll('.typeahead__option:not(.hidden)');
    // always remove selected from the first element
    items[0].classList.remove('selected');
    // the below will evaluate to false and no looping will occur if items[0] was selected previously
    if (optionsContainer.querySelectorAll('.typeahead__option.selected').length > 0){
      // moveSelectedClass(items, -1);
      for (var i = items.length -1; i > 0; i--) {
        if (items[i].classList.contains('selected')) {
          items[i].classList.remove('selected');
          items[i - 1].classList.add('selected');
          break;
        }
      }
    }
  };

  // Filters MarkUp
  var filterDropDownOptions = function(options, criteria) {
    var criteriaLowerCase = criteria.toLowerCase();
    var matched = Array.from(options.children).map(function(el){
      var optionLowerCase = el.innerHTML.toLowerCase();
      if (optionLowerCase.startsWith(criteriaLowerCase)) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    });
  }

var createEvent = function(el, type){
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, false, true);
  el.dispatchEvent(e);
}
  // Adds selected option to the textInput on Click
  var addOptionToInput = function() {
    var selectedOption = event.target;
    var input = event.target.parentElement.parentElement.querySelector('.typeahead__input');
    var options = event.target.parentElement.querySelectorAll('.typeahead__option');
    for (option of options){
      option.classList.contains('selected') ? option.classList.remove('selected') : null;
    }
    selectedOption.classList.add('selected');
    input.value = selectedOption.innerHTML;
    addClass(event.target.parentNode, 'hidden');

    createEvent(input,'input');
  };

  var enterOptionToInput = function(){
    console.log('enterOptionToInput');
    var selectedInput = event.target.parentElement.querySelector('.typeahead__options .selected');
    selectedInput ? event.target.value = selectedInput.innerHTML : null;
    addClass(event.target.parentElement.querySelector('.typeahead__options'), 'hidden');
    createEvent(event.target.parentElement.querySelector('.typeahead__input'), 'input');
  };

  var addSelectedOnHover = function(){
    var options = event.target.parentElement.querySelectorAll('.typeahead__option');
    for (option of options) {
      option.classList.contains('selected') ? removeClass(option, 'selected') : null;
    }
    addClass(event.target, 'selected');
  };

  var dropDownArrowClick = function(context){
    var optionsContainer = context.parentElement.querySelector('.typeahead__options');
    var options = optionsContainer.querySelectorAll('.typeahead__option');
    if (optionsContainer.classList.contains('hidden')){
      removeClass(optionsContainer, 'hidden');
      for (option of options){
        removeClass(option, 'hidden');
      };
    } else {
      addClass(optionsContainer, 'hidden');
    }
  };

  // I. Getting Data for the dropdown (likely to be retrived via HTTP Request)
  var data = ['Tom', 'John', 'Alfred', 'Jerry', 'Peter','Chris','Zebra','Goat','Dog','Chester','Waldo'];
  // var data = [{ name: 'Tom' },{ name: 'Jerry' }, { name: 'Blue' }];

  // II. Making an object made up of markup for iteration
  var markup = {
    options: generateMarkUp(data, 'name'),
    dropDownArrow: document.getElementsByClassName('typeahead__arrow')[0],
    dropDownInput: document.getElementsByClassName('typeahead__input')[0],
    optionsContainer: document.getElementsByClassName('typeahead__options')[0],
    option: document.getElementsByClassName('typeahead__option')
  };

  // III. Actually rendering the markup for the options under the type-ahead input
  renderMarkUp(markup.options, markup.optionsContainer);

  // IV. Toggle the visibility of options under drop down for dropdownArrow onclick
  markup.dropDownArrow.addEventListener('click', function(){ dropDownArrowClick(this)} );

  // V. Clicking input shows options:
  markup.dropDownInput.addEventListener('focus', function(){ removeClass(this.parentElement.querySelector('.typeahead__options'), 'hidden');});

  // VI. Typing on dropdown filters responds based on keyboard input
  markup.dropDownInput.addEventListener('keyup', inputHandler);

  // VII. Move Selected Class for every option onhover
  for(option of markup.option) {
    option.addEventListener('mouseover', addSelectedOnHover);
  };
}());
