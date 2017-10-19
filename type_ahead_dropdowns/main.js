/* So 4 functions: filter drop down, show dropdown, update text input, and close drop down */

var body = document.getElementsByTagName('body')[0];
var dropDownArrow = document.getElementsByClassName('type-ahead__arrow')[0];
var dropDownInput = document.getElementsByClassName('type-ahead__input')[0];
var optionsContainer = document.getElementsByClassName('type-ahead__options')[0];


var filterDropDownOptions = function() {
  // function is firing
  // input text is available
  var criteria = event.target.value;
  console.log('filterDropDownOptions', criteria);
  // options are displayed
  while (optionsContainer.firstChild) {
      optionsContainer.removeChild(optionsContainer.firstChild);
  }
  showDropDownOptions(criteria);
}

var showDropDownOptions = function(criteria) {
  // create all of the options for the dropdown menu
  console.log('showDropDownOptions');

  var data = ['test', 'test2', 'test3', 'test4', 'test3','test3','test3','test3','test3','test3','test3',];
  if (criteria.length > 0) {
    data = data.filter(function(el) {
      return el.includes(criteria);
    });
  }
  var options = data.map(function(el, index){
    // for some really stupid reason i cant do option elements
    var optionElement = document.createElement('input');
    // because option.value dont work
    optionElement.value = el;
    optionElement.tabIndex = -index - 1;
    optionElement.className = 'type-ahead__option';
    optionElement.addEventListener('click', updateInput);
    return optionElement;
  });
  if (optionsContainer.children.length === 0) {
    for (let option of options) {
      optionsContainer.appendChild(option);
    }
  }
  optionsContainer.classList.remove('hidden');
}

var updateInput = function() {
  var options = document.querySelectorAll('.type-ahead__option');
  var iterableOptions = Object.values(options);
  var selectedOption = iterableOptions.filter(function(el){
  	return el.value === event.target.value;
  });
  const newInputValue = selectedOption[0].value;
  dropDownInput.value = newInputValue;
}

var closeOptions = function () {
  console.log('closeOptions');
  var dropDownInput = document.getElementsByClassName('type-ahead__input')[0];
  var dropDownArrow = document.getElementsByClassName('type-ahead__arrow')[0];
  if (document.activeElement !== dropDownArrow) {
    while (optionsContainer.firstChild) {
      optionsContainer.removeChild(optionsContainer.firstChild);
    }
    optionsContainer.classList.add('hidden');
  }
}

dropDownArrow.addEventListener('click', showDropDownOptions);
dropDownInput.addEventListener('keyup', filterDropDownOptions.bind(null, event));
body.addEventListener('click', closeOptions);
