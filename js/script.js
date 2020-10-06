function isNumber(value) {
  return !isNaN(value) && value !== ' ';
}

function isLetter(value) {
  return value.toLowerCase() !== value.toUpperCase();
}

function isLowerCaseLetter(value) {
  return isLetter(value) && value === value.toLowerCase();
}

function isUpperCaseLetter(value) {
  return isLetter(value) && value === value.toUpperCase();
}

function isSymbol(value) {
  return isNaN(value) && value.toLowerCase() === value.toUpperCase();
}

var validations = [
  {
    id: 'v1',
    description: 'A senha contém pelo menos 8 caracteres.',
    validationFunction: function validate(value) {
      return value.length >= 8;
    },
  },
  {
    id: 'v2',
    description: 'A senha contém pelo menos 1 caractere numérico.',
    validationFunction: function validate(value) {
      var array = value.split('');
      for (var i = 0; i < array.length; i++) {
        var currentValue = array[i];
        if (isNumber(currentValue)) {
          return true;
        }
      }
      return false;
    },
  },
  {
    id: 'v3',
    description: 'A senha contém pelo menos 1 caractere minúsculo.',
    validationFunction: function validate(value) {
      var array = value.split('');
      for (var i = 0; i < array.length; i++) {
        var currentValue = array[i];
        if (isLowerCaseLetter(currentValue)) {
          return true;
        }
      }
      return false;
    },
  },
  {
    id: 'v4',
    description: 'A senha contém pelo menos 1 caractere maiúsculo.',
    validationFunction: function validate(value) {
      var array = value.split('');
      for (var i = 0; i < array.length; i++) {
        var currentValue = array[i];
        if (isUpperCaseLetter(currentValue)) {
          return true;
        }
      }
      return false;
    },
  },
  {
    id: 'v5',
    description: 'A senha contém pelo menos 1 caractere especial.',
    validationFunction: function validate(value) {
      var array = value.split('');
      for (var i = 0; i < array.length; i++) {
        var currentValue = array[i];
        if (isSymbol(currentValue)) {
          return true;
        }
      }
      return false;
    },
  },
  {
    id: 'v6',
    description: 'A senha não pode conter espaços em branco.',
    validationFunction: function validate(value) {
      var array = value.split('');
      for (var i = 0; i < array.length; i++) {
        var currentValue = array[i];
        if (currentValue === ' ') {
          return false;
        }
      }
      return true;
    },
  },
];

// window.addEventListener('load', start);

function start() {
  var inputPassword = document.querySelector('#inputPassword');
  inputPassword.addEventListener('input', handleInputChange);
  validatePassword('');
}

function handleInputChange(event) {
  var password = event.target.value;
  var typedPassword = document.querySelector('#typedPassword');
  typedPassword.textContent = password;

  validatePassword(password);
}

function validatePassword(password) {
  var divValidations = document.querySelector('#divValidations');
  divValidations.innerHTML = '';

  for (var i = 0; i < validations.length; i++) {
    var currentValidation = validations[i];
    var div = document.createElement('div');
    var label = document.createElement('label');
    var input = document.createElement('input');
    var span = document.createElement('span');

    input.type = 'checkbox';
    input.disabled = true;
    input.checked = currentValidation.validationFunction(password);

    span.textContent = currentValidation.description;
    label.appendChild(input);
    label.appendChild(span);

    div.appendChild(label);
    divValidations.appendChild(div);
  }
}

start();
