// Document Ready function
$(document).on('turbolinks:load', function() {
  var theForm = $('#pro-form');
  var submitBtn = $('#form-signup-btn');

  // Set stripe public key
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content'));

  // when user click form submit button prevent default submission
  submitBtn.click(function(){
    event.preventDefault();
    submitBtn.val("Processing").prop('disabled', true);

    // collect credit card field
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();

    // use stripe js lib to check for errors

    var error = false;

    if (!Stripe.card.validateCardNumber(ccNum)) {
      error = true;
      alert('The credit card number is invalid')
    }

    if (!Stripe.card.validateCVC(cvcNum)) {
      error = true;
      alert('The CVC number is invalid')
    }

    if (!Stripe.card.validateExpiry(expMonth, expYear)) {
      error = true;
      alert('The exp date is invalid')
    }

    if (error) {
      submitBtn.prop('disabled', false).val("Sign Up");
    }
    
    else {
      // send card info to stripe
      Stripe.createToken({
        number: ccNum,
        cvc: cvcNum,
        exp_month: expMonth,
        exp_year: expYear
      }, stripeResponseHandler);
    }
    return false;
  });
  // stripe return back card token
  function stripeResponseHandler(status, response) {
    var token = response.id // get the token from the response

    // inject card token as hidden_field_tag
    theForm.append($('<input type="hidden" name="user[stripe_card_token]">').val(token));

    // submit form to our rails app
    theForm.get(0).submit();
  }

});
