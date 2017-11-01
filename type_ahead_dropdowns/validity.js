;(function(){
  var markup = {
    inputs: document.querySelectorAll('.js_valid__target'),
    button: document.getElementById('submit'),
  };
  var checkValidity = function () {
    console.log('checkvalidity fired!');
    // need to find .input-wrapper instead of just going up one parent
    var input = event.target;
    input.validity.valid ? removeInvalidClass(input) : input.parentElement.classList.add('invalid');
  }
  var removeInvalidClass = function(input) {
    console.log('removeInvalidClass', input.parentElement);
    input.parentElement.classList.remove('invalid');
  }

  for (input of markup.inputs) {
    input.addEventListener('blur', checkValidity);
    input.addEventListener('input', checkValidity);
    input.addEventListener('keydown', checkValidity);
  };

}());
