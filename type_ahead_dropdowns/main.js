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
  var showElement = function(el) {
    el.classList.remove('hidden');
  };

  var hideElement = function(el) {
    el.classList.add('hidden');
  };

  var inputHandler = function(event) {

    var options = event.target.parentNode.querySelector('.typeahead__options');
    var criteria = event.target.value;
    switch (event.keyCode) {
      // down arrow
      case 40:
        console.log('down arrow is pressed');
        goToNext();
        break;
      // up arrow
      case 38:
        console.log('up arrow is pressed');
        goToPrevious();
        break;
      case 13:
        console.log('enter is pressed');
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
    var list = [];
    var criteriaLowerCase = criteria.toLowerCase();

    var matched = Array.from(options.children).map(function(el){
      if (el.innerHTML.startsWith(criteria)) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    });
  }

  // Adds selected option to the textInput on Click
  var addOptionToInput = function() {
    var selectedInput = event.target.innerHTML;
    markup.dropDownInput.value = selectedInput;
    hideElement(event.target.parentNode);
  };

  var enterOptionToInput = function(){
    var selectedInput = event.target.parentElement.querySelector('.typeahead__options .selected');
    // console.log(selectedInput.innerHTML);
    selectedInput ? event.target.value = selectedInput.innerHTML : null;
    hideElement(event.target.parentElement.querySelector('.typeahead__options'));
  };

  // I. Getting Data for the dropdown (to be retrived via HTTP Request)
  // var data = [{ name: 'Tom' },{ name: 'Jerry' }, { name: 'Blue' }];
  var data = ['Tom', 'John', 'Alfred', 'Jerry', 'Peter','Chris','Zebra','Goat','Dog','Chester','Waldo'];
  // II. Making a robust object made of markup for iteration and easy reference
  var markup = {
    options: generateMarkUp(data, 'name'),
    body: document.getElementsByTagName('body')[0],
    dropDownArrow: document.getElementsByClassName('typeahead__arrow')[0],
    dropDownInput: document.getElementsByClassName('typeahead__input')[0],
    optionsContainer: document.getElementsByClassName('typeahead__options')[0],
    option: document.getElementsByClassName('typeahead__option')
  };
  // III. Actually rendering the markup
  renderMarkUp(markup.options, markup.optionsContainer);
  markup.dropDownArrow.addEventListener('click', function(){
    var optionsContainer = this.parentElement.querySelector('.typeahead__options');
    optionsContainer.classList.contains('hidden') ? showElement(optionsContainer) : hideElement(optionsContainer);
    // this.parentElement.querySelector('.typeahead__input').focus();
  });
  markup.dropDownInput.addEventListener('focus', function(){ showElement(this.parentElement.querySelector('.typeahead__options'));});
  markup.dropDownInput.addEventListener('keyup', inputHandler);
}());
