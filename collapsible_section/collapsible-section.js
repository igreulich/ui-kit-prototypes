$(document).ready(function() {

  $('.collapsible-group.toggle-on .collapsible-section-handler').on('change', function(){
    console.log(this.checked);
    if (this.checked) {
      $('.collapsible-section-handler').not(this).prop('checked', false);
    }
  });




























});
