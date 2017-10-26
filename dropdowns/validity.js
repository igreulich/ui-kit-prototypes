;(function(){
  var markup = {
    inputs: document.querySelectorAll('.js_valid__target'),
    button: document.getElementById('submit'),
  };
  var checkValidity = function (){
    for (input of markup.inputs) {
      !input.validity.valid ? input.parentElement.classList.add('invalid') : null;
    }
  };
  for (input of markup.inputs) {
    input.addEventListener('click', function(){
      input.validity.valid ? console.log('remove invalid class') : null;
    });
  }
  markup.button.addEventListener('click', checkValidity);
}());
