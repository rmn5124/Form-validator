const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

function checkEmail(input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}
function checkRequired(arr) {
  arr.forEach(function (input) {
    if (input.value.trim() === '') {
      showError(input, `${getInput(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getInput(input)} must be at least ${min} character`);
  } else if (input.value.length > max) {
    showError(input, `${getInput(input)} must be at most ${max} character`);
  } else {
    showSuccess(input);
  }
}
function checkPassword(p1, p2) {
  if (p1.value !== p2.value) {
    showError(p2, 'Password do not match');
  }
}
function getInput(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
form.addEventListener('submit', function (e) {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 20);
  checkLength(password, 6, 20);
  checkEmail(email);
  checkPassword(password, password2);
});
