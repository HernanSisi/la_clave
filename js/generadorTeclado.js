export const generadorTeclado = (element) => {
    const numerosTeclado = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'BORRAR', '0', 'ENVIAR'];
    // var tecladoGenerado = document.createElement('div');
    numerosTeclado.forEach(i=>{
        var tecla = document.createElement('div');
        tecla.classList.add('Teclado__Tecla');
        tecla.id = 'tecla-' + i;
        var teclaTexto = document.createElement('span');
        teclaTexto.textContent = i;
        teclaTexto.classList.add('Teclado__Tecla__Texto');
        if (i === 'BORRAR') {
            tecla.classList.add('Teclado__Tecla--rojo');
            tecla.addEventListener('click', event => teclaAccionBorrar());
        } else if (i === 'ENVIAR') {
            tecla.classList.add('Teclado__Tecla--verde');
            tecla.addEventListener('click', event => teclaAccionEnviar());
        } else {
            tecla.addEventListener('click', event => teclaAccionNumero(i));
        }
        tecla.appendChild(teclaTexto);
        element.appendChild(tecla);
    })
};
var actual = 0;
var display = '';
var desactivado = false;
const teclaAccionNumero = (numero) => {
    new Audio('../audio/audio click.mp3').play();
    if (actual>3 || desactivado) return;
    const dispLetras = document.querySelectorAll('[data-display-numero]');
    dispLetras[actual].textContent = numero;
    display +=numero;
    actual++;
};
const teclaAccionBorrar = () => {
    new Audio('../audio/audio click.mp3').play();
    if (desactivado) return;
    const dispLetras = document.querySelectorAll('[data-display-numero]');
    dispLetras.forEach(element => {
        element.textContent = '_';
        element.classList.remove('Display__Texto--error');
    });
    document.querySelector('[data-display]').classList.remove('Display--error');
    actual = 0;
    display = '';

};
const teclaAccionEnviar = () => {
    new Audio('../audio/audio click.mp3').play();
    const dispLetras = document.querySelectorAll('[data-display-numero]');
    if (display === '5913') {
        dispLetras.forEach(element => {
            element.classList.add('Display__Texto--acierto');
        });
        document.querySelector('[data-display]').classList.add('Display--acierto');
        setTimeout(function() { 
            window.location.href = '../acertaste.html';
        },3000);
    }
    dispLetras.forEach(element => {
        element.classList.add('Display__Texto--error');
    });
    document.querySelector('[data-display]').classList.add('Display--error');
    desactivado = true;
    setTimeout(function(){
        desactivado=false;
        teclaAccionBorrar();
    },4000);
};