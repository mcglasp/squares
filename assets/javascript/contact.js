
// CREDIT Code supplied by Formspree

  window.addEventListener("DOMContentLoaded", function() {

    // get the form elements defined in your form HTML above
    
    let contactForm = document.getElementById("contactForm");
    let button = document.getElementById("formBtn");
    let status = document.getElementById("form-status");

    function success() {
      contactForm.reset();
      button.style = "display: none";
      status.innerHTML = "Thank you!";
    }

    function error() {
      status.innerHTML = "Huh, something went wrong...";
    }

    contactForm.addEventListener("submit", function(ev) {
      ev.preventDefault();
      let data = new FormData(contactForm);
      ajax(contactForm.method, contactForm.action, data, success, error);
    });
  });
  
  function ajax(method, url, data, success, error) {
    let xhr = new XMLHttpRequest();
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


