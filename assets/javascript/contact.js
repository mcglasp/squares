
// CREDIT Code supplied by Formspree

  window.addEventListener("DOMContentLoaded", function() {

    // get the form elements defined in your form HTML above
    
    var contactForm = document.getElementById("contactForm");
    var button = document.getElementById("formBtn");
    var status = document.getElementById("form-status");

    // Success and Error functions for after the form is submitted
    
    function success() {
      contactForm.reset();
      button.style = "display: none ";
      status.innerHTML = "Thanks!";
    }

    function error() {
      status.innerHTML = "Oops! There was a problem.";
    }

    // handle the form submission event

    contactForm.addEventListener("submit", function(ev) {
      ev.preventDefault();
      var data = new FormData(contactForm);
      ajax(contactForm.method, contactForm.action, data, success, error);
    });
  });
  
  // helper function for sending an AJAX request

  function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        success(xhr.response, xhr.responseType);
      } else {
        error(xhr.status, xhr.response, xhr.responseType);
      }
    };
    xhr.send(data);
  }


