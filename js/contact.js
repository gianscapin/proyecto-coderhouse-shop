// Variables
const btnSend = document.getElementById('enviar');
const form = document.getElementById('enviar-mail');
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const btnReset = document.getElementById('resetBtn');

// Variables para campos

const email = document.getElementById('email');
const topic = document.getElementById('asunto');
const message = document.getElementById('mensaje');





eventListeners();

function eventListeners() {
    document.addEventListener('DOMContentLoaded', startApp);

    // Campos del formulario

    email.addEventListener('blur', validateForm);
    topic.addEventListener('blur', validateForm);
    message.addEventListener('blur', validateForm);

    // Enviar email

    form.addEventListener('submit', sendEmail);

    btnReset.addEventListener('click', formReset);
}




// Functiones

function startApp() {
    btnSend.disabled = true;

    btnSend.classList.add('cursor-not-allowed', 'opacity-50');
}

function validateForm(event) {
    if (event.target.value.length > 0) {
        const error = document.querySelector('p.error');
        if (error) {
            error.remove();
        }
        event.target.classList.remove('border', 'border-red-500');
        event.target.classList.add('border', 'border-green-500');

        /*
        const resultado = event.target.value.indexOf('@');
        if (resultado < 0) {
            showError('Dato introducido no es un email.');
        */

    } else {
        event.target.classList.remove('border', 'border-green-500');
        event.target.classList.add('border', 'border-red-500');
        showError('Todos los campos son obligatorios.');
    }

    // VALIDAR EMAIL
    if (event.target.type == 'email') {

        if (re.test(event.target.value)) {
            const error = document.querySelector('p.error');
            if (error) {
                error.remove();
            }

            event.target.classList.remove('border', 'border-red-500');
            event.target.classList.add('border', 'border-green-500');
        } else {
            event.target.classList.remove('border', 'border-red-500');
            event.target.classList.add('border', 'border-green-500');
            showError('Email no válido.');
        }
    }

    // CUANDO ESTA TODO LISTO

    if (re.test(email.value) !== '' && topic.value !== '' && message.value !== '') {
        console.log('campos validados completos');
        btnSend.disabled = false;
        btnSend.classList.remove('cursor-not-allowed', 'opacity-50');
    } else {
        console.log('faltan campos por validar');
    }
}

function showError(message) {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = message;

    errorMessage.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');
    // Si hay más de un error se muestra uno solo.
    const errors = document.querySelectorAll('.error');
    if (errors.length === 0) {
        form.appendChild(errorMessage);
    }

}

// Enviar email

function sendEmail(event) {
    event.preventDefault();
    // Mostrar spinner

    const spinner = document.getElementById('spinner');
    spinner.style.display = 'flex';

    // Después de 3 segundos ocultar spinner y mostrar mensaje

    setTimeout(function() {
        spinner.style.display = 'none';
        const p = document.createElement('p');
        p.textContent = 'El mensaje se envió correctamente.';
        p.classList.add('text-center', 'my-10', 'p-5', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');
        // Inserta el parrafo antes del spinner en el HTML
        form.insertBefore(p, spinner);
        setTimeout(function() {
            p.remove();

            formReset();
        }, 5000)
    }, 3000);


}

// Resetear el formulario

function formReset() {
    form.reset();

    startApp();
}