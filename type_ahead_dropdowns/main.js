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
      var optionElement = document.createElement('input');
      optionElement.className = 'typeahead__option';
      optionElement.addEventListener('click', addOptionToInput);
      optionElement.tabIndex = -index - 1;
      if (typeof el === 'string') {
        optionElement.value = el;
      } else if (typeof el === 'object') {
        // deal with an array of objects
        optionElement.value = el[objProperty];
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
  var toggleDropDown = function () {
    markup.optionsContainer.classList.toggle('hidden');
  };

  // Filters MarkUp
  var filterDropDownOptions = function() {
    var criteria = event.target.value.toUpperCase();
    var items = document.querySelectorAll('.typeahead__option');
    for (let item of items) {
      var itemValue = item.value.toUpperCase();
      if (!itemValue.includes(criteria)) {
        item.classList.add('hidden');
      } else if (itemValue.includes(criteria)){
        item.classList.contains('hidden') ? item.classList.remove('hidden') : null;
      }
    }
    if (document.querySelectorAll('input.hidden').length === items.length) {
     markup.optionsContainer.classList.add('hidden');
   } else if (document.querySelectorAll('input.hidden').length < items.length) {
     markup.optionsContainer.classList.contains('hidden') ?
       markup.optionsContainer.classList.remove('hidden') :
       null;
   }
  };

  // Adds selected option to the textInput
  var addOptionToInput = function() {
    var selectedInput = event.target.value;
    markup.dropDownInput.value = selectedInput;
    toggleDropDown();
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
    optionsContainer: document.getElementsByClassName('typeahead__options')[0]
  };
  // III. Actually rendering the markup
  renderMarkUp(markup.options, markup.optionsContainer);
  markup.dropDownArrow.addEventListener('click', toggleDropDown);
  markup.dropDownInput.addEventListener('keyup', filterDropDownOptions);
}());
