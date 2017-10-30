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
    var options = event.target.parentNode.querySelector('.typeahead__options');
    options.classList.contains('hidden') ? removeClass(options, 'hidden') : null;
    var criteria = event.target.value;
    switch (event.keyCode) {
      // down arrow
      case 40:
        goToNext();
        break;
      // up arrow
      case 38:
        goToPrevious();
        break;
      // enter
      case 13:
        enterOptionToInput();
        break;
      default:
        filterDropDownOptions(options, criteria);
        break;
    }
  }

  var goToNext = function() {
    var optionsContainer = event.target.parentNode.querySelector('.typeahead__options');
    var items = optionsContainer.querySelectorAll('.typeahead__option:not(.hidden)');
    if (optionsContainer.querySelectorAll('.typeahead__option.selected').length > 0){
      for (var i = 0; i < items.length - 1; i++) {
        if (items[i].classList.contains('selected')) {
          items[i].classList.remove('selected');
          items[i + 1].classList.add('selected');
          break;
        }
      }
    } else {
      items[0].classList.add('selected');
    }
  }

  var goToPrevious = function() {
    var optionsContainer = event.target.parentNode.querySelector('.typeahead__options');
    var items = optionsContainer.querySelectorAll('.typeahead__option:not(.hidden)');
    items[0].classList.contains('selected') ? items[0].classList.remove('selected') : null;
    if (optionsContainer.querySelectorAll('.typeahead__option.selected').length > 0){
      for (var i = 0; i < items.length; i++) {
        if (items[i].classList.contains('selected')) {
          items[i].classList.remove('selected');
          items[i - 1].classList.add('selected');
          break;
        }
      }
    }
  }

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
  };

  var enterOptionToInput = function(){
    var selectedInput = event.target.parentElement.querySelector('.typeahead__options .selected');
    // console.log(selectedInput.innerHTML);
    selectedInput ? event.target.value = selectedInput.innerHTML : null;
    addClass(event.target.parentElement.querySelector('.typeahead__options'), 'hidden');
  };

  var addSelectedOnHover = function(){
    var options = event.target.parentElement.querySelectorAll('.typeahead__option');
    for (option of options) {
      option.classList.contains('selected') ? removeClass(option, 'selected') : null;
    }
    addClass(event.target, 'selected');
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
  markup.dropDownArrow.addEventListener('click', function(){
    var optionsContainer = this.parentElement.querySelector('.typeahead__options');
    optionsContainer.classList.contains('hidden') ? removeClass(optionsContainer, 'hidden') : addClass(optionsContainer, 'hidden');
  });

  // V. Clicking input shows options:
  markup.dropDownInput.addEventListener('focus', function(){ removeClass(this.parentElement.querySelector('.typeahead__options'), 'hidden');});

  // VI. Typing on dropdown filters responds based on keyboard input
  markup.dropDownInput.addEventListener('keyup', inputHandler);

  // VII. Move Selected Class for every option onhover
  for(option of markup.option) {
    option.addEventListener('mouseover', addSelectedOnHover);
  };
}());
