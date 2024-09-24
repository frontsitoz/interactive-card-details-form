//CARDHOLDER NAME

let nameCard = document.querySelector(".card__details-name");
let nameInput = document.querySelector("#cardholder");

let nameErrorDiv = document.querySelector(".form__cardholder--error.error");

//CARD NUMBER

let numberCard = document.querySelector(".card__number");
let numberInput = document.querySelector("#cardNumber");

let numberErrorDiv = document.querySelector(".form__inputnumber--error.error");

//MM

let monthCard = document.querySelector(".card__month");
let monthInput = document.querySelector("#cardMonth");
let monthErrorDiv = document.querySelector(".form__input-mm--error.error");

//YY

let yearCard = document.querySelector(".card__year");
let yearInput = document.querySelector("#cardYear");
let yearErrorDiv = document.querySelector(".form__input-yy--error.error");

//CVC

let cvcCard = document.querySelector(".card-back__cvc");
let cvcInput = document.querySelector("#cardCvc");
let cvcErrorDiv = document.querySelector(".form__input-cvc--error.error");

//thanks-section

let thanksSection = document.querySelector(".thanks-section");

//form-section
let formSection = document.querySelector(".form");

//Ingreso dinámico del nombre

nameInput.addEventListener("input", () => {
  if (nameInput.value === "") {
    nameCard.innerText = "Alvaro Prado";
  } else {
    nameCard.innerText = nameInput.value;
  }
});

//Ingreso dinámico del número

numberInput.addEventListener("input", (event) => {
  let inputValue = event.target.value;

  //Actualizando gráficamente la tarjeta
  numberCard.innerHTML = numberInput.value;
  //Validando que haya una letra
  let regExp = /[^\d\s]/g; //Buscar cualquier caracter que no sea un número o un espacio
  if (regExp.test(numberInput.value)) {
    showError(numberInput, numberErrorDiv, "Wrong format, numbers only");
  } else {
    //Agregando espacios cada 4 dígitos
    numberInput.value = inputValue
      .replace(/\s/g, "")
      .replace(/([0-9]{4})/g, "$1 ") //Agregar un espacio cada 4 dígitos
      .trim(); //Eliminar espacio adicional al final si lo hay
    showError(numberInput, numberErrorDiv, "", false);
  }
  //Mostrando los 0s por defecto cuando no se ha ingresado nada
  if (numberInput.value == "") {
    numberCard.innerHTML = "0000 0000 0000 0000";
  }
});

//Ingreso dinámico del mes

monthInput.addEventListener("input", () => {
  monthCard.innerText = monthInput.value;
  validateLetters(monthInput, monthErrorDiv);
});

//Ingreso dinámico del año
yearInput.addEventListener("input", () => {
  yearCard.innerText = yearInput.value;
  validateLetters(yearInput, yearErrorDiv);
});

//Ingreso dinámico del cvc

cvcInput.addEventListener("input", () => {
  cvcCard.innerText = cvcInput.value;
  validateLetters(cvcInput, cvcErrorDiv);
});

//Botón Confirm

let confirmBtn = document.querySelector(".form__submit");
let nameValidation = false;
let numberValidation = false;
let monthValidation = false;
let yearValidation = false;
let cvcValidation = false;

confirmBtn.addEventListener("click", (event) => {
  event.preventDefault();

  //Validar Nombre
  if (verifyIsFilled(nameInput, nameErrorDiv)) {
    nameValidation = true;
  } else {
    nameValidation = false;
  }

  //Validar Número
  if (verifyIsFilled(numberInput, numberErrorDiv) == true) {
    if (numberInput.value.length == 19) {
      showError(numberInput, numberErrorDiv, "", false);
      numberValidation = true;
    } else {
      showError(numberInput, numberErrorDiv, "Wrong number");
      numberValidation = false;
    }
  }

  //Validar Mes
  if (verifyIsFilled(monthInput, monthErrorDiv)) {
    if (parseInt(monthInput.value) > 0 && parseInt(monthInput.value) <= 12) {
      showError(monthInput, monthErrorDiv, "", false);
      monthValidation = true;
    } else {
      showError(monthInput, monthErrorDiv, "Month incorrect");
      monthValidation = false;
    }
  }

  //Validar Año
  if (verifyIsFilled(yearInput, yearErrorDiv)) {
    if (parseInt(yearInput.value) > 23 && parseInt(yearInput.value) <= 29) {
      showError(yearInput, yearErrorDiv, "", false);
      yearValidation = true;
    } else {
      showError(yearInput, yearErrorDiv, "Wrong Year");
      yearValidation = false;
    }
  }

  //Validar cvc
  if (verifyIsFilled(cvcInput, cvcErrorDiv)) {
    if (cvcInput.value.length == 3) {
      showError(cvcInput, cvcErrorDiv, "", false);
      cvcValidation = true;
    } else {
      showError(cvcInput, cvcErrorDiv, "Wrong CVC");
      cvcValidation = false;
    }
  }

  if (
    nameValidation == true &&
    numberValidation == true &&
    monthValidation == true &&
    yearValidation == true &&
    cvcValidation == true
  ) {
    formSection.style.display = "none";
    thanksSection.style.display = "block";
  }
});

//Funciones

function showError(divInput, divError, msgError, show = true) {
  if (show) {
    divError.innerText = msgError;
    divInput.style.borderColor = "#FF0000";
  } else {
    divError.innerText = msgError;
    divInput.style.borderColor = "hsl(270, 3%, 87%)";
  }
}

function verifyIsFilled(divInput, divError) {
  if (divInput.value.length > 0) {
    showError(divInput, divError, "", false);
    return true;
  } else {
    showError(divInput, divError, "Can't be blank");
    return false;
  }
}

function validateLetters(input, divError) {
  let regExp = /[^\d\s]/g;
  if (regExp.test(input.value)) {
    showError(input, divError, "Wrong format, numbers only");
  } else {
    showError(input, divError, "", false);
  }
}
