/* So 4 functions: filter drop down, show dropdown, update text input, and close drop down */

;(function() {
  // Displays markup on page
  var renderMarkUp = function(array, parent) {
    for (let item of array) {
      parent.appendChild(item);
    }
    parent.classList.add('hidden');
  };

  // Generates Markup to be Displayed in renderMarkUp
  var generateMarkUp = function(array) {
    var options = data.map(function(el, index){
      // for some really stupid reason I cant do option elements
      var optionElement = document.createElement('input');
      // because option.value don't work
      optionElement.value = el;
      optionElement.tabIndex = 0;
      optionElement.className = 'type-ahead__option';
      optionElement.addEventListener('click', addOptionToInput);
      return optionElement;
    });
    return options;
  };

  // Shows/Hides Markup
  var toggleDropDown = function () {
    markup.optionsContainer.classList.toggle('hidden');
  };

  // Filters MarkUp
  var filterDropDownOptions = function() {
    var criteria = event.target.value;
    var items = document.querySelectorAll('.type-ahead__option');
    for (let item of items) {
      if (!item.value.includes(criteria)) {
        item.classList.add('hidden');
      } else if (item.value.includes(criteria)){
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
    console.log('addOptionToInput is firing', event.target.value);
    var selectedInput = event.target.value;
    markup.dropDownInput.value = selectedInput;
    toggleDropDown();
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("change", true, true);
  };

  // I. Getting Data for the dropdown (to be retrived via HTTP Request)
  var data = ['test', 'test2', 'test3', 'test4', 'test3','test3','test3','test3','test3','test3','test3'];
  // II. Making a robust object made of markup for iteration and easy reference
  var markup = {
    options: generateMarkUp(data),
    body: document.getElementsByTagName('body')[0],
    dropDownArrow: document.getElementsByClassName('type-ahead__arrow')[0],
    dropDownInput: document.getElementsByClassName('type-ahead__input')[0],
    optionsContainer: document.getElementsByClassName('type-ahead__options')[0]
  };
  // III. Actually rendering the markup
  renderMarkUp(markup.options, markup.optionsContainer);
  markup.dropDownArrow.addEventListener('click', toggleDropDown);
  markup.dropDownInput.addEventListener('keyup', filterDropDownOptions);
}());
