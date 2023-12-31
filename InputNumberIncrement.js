const stepFallback = '1'
const initialValueFallback = '0'
const dependStepFallback = '0'

function checkForNan(value, basevalue) {
  if (isNaN(value) || value == '') {
    return basevalue
  }
  else {
    return value
  }
}

$(document).ready(function () {
  // Select all elements with the specified class and set the initial value
  $('.input-number').each(function () {
    // Get the initial-value attribute and set it as the input's initial value
    var initialValue = checkForNan($(this).attr('initial-value'), initialValueFallback);
    $(this).val(initialValue).trigger('change');;
  });
});


$('.input-number-increment').click(function () {
  const $input = $(this).parents('.input-number-group').find('.input-number');
  //Add -1 cause if initialvalue = 0 and user first time click '+' it must give us 0.
  const initialvalue = checkForNan($input.attr('initial-value'), initialValueFallback);
  const val = parseInt($input.val(), 10);
  const step = parseInt(checkForNan($input.attr('step'), stepFallback), 10);

  $input.data('previousValue', $input.val())
  $input.val(val + step).trigger('change');
});

$('.input-number-decrement').click(function () {
  const $input = $(this).parents('.input-number-group').find('.input-number');
  //Add -1 cause if initialvalue = 0 and user first time click '-' it must give us 0.
  const initialvalue = checkForNan($input.attr('initial-value'), initialValueFallback);
  const val = parseInt($input.val(), 10);
  const step = parseInt(checkForNan($input.attr('step'), stepFallback), 10);

  $input.data('previousValue', $input.val())
  $input.val(val - step).trigger('change');
})

//Check if field was modified by hands.
$('.input-number').on('change', function () {
  const newValue = parseInt($(this).val(), 10);
  const minvalue = parseInt($(this).attr('min-value'), 10);
  const maxvalue = parseInt($(this).attr('max-value'), 10);

  if (newValue < minvalue) {
    $(this).val(minvalue);
  }
  else if (newValue > maxvalue) {
    $(this).val(maxvalue);
  }
  else if (isNaN(newValue)) {
    //This check need if minvalue is not set.
    if (isNaN(initialValueFallback)) {
      $(this).val(minvalue);
    }
    else {
      $(this).val(initialValueFallback);
    }
  }
  //Check was changed child object.
  else if (newValue > parseInt($(this).data('previousValue'), 10)) {
    const parentId = $(this).attr('parent-depend-id')
    if (parentId) {
      const $parent = $('#' + parentId); // Replace with your actual element ID
      const parentValue = parseInt($parent.val(), 10);
      const dependStep = parseInt(checkForNan($(this).attr('depend-step'), dependStepFallback), 10);
      if (parentValue < (newValue + dependStep)) {
        $(this).val(parentValue - dependStep);
      }
    }
  }
  //Check was changed parent object.
  else if (newValue < parseInt($(this).data('previousValue'), 10)) {
    const childId = $(this).attr('child-depend-id')
    if (childId) {
      const $child = $('#' + childId); // Replace with your actual element ID
      const childValue = parseInt($child.val(), 10);
      const dependStep = parseInt(checkForNan($child.attr('depend-step'), dependStepFallback), 10);
      if (childValue > (newValue - dependStep)) {
        $child.val(newValue - dependStep);
        $child[0].dispatchEvent(new Event('input'));
      }
    }
  }
  $(this)[0].dispatchEvent(new Event('input'));
});

//Need to save previous value
$('input').on('focusin', function () {
  $(this).data('previousValue', $(this).val());
});

