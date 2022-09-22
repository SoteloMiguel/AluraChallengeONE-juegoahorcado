/**
 *  Declaro las variables globales
 */
var arrPalabras = [
  "CANARIO", "SATELITE", "LIMON", "TOMATE", "PERRO",
  "LIBRO","NOTEBOOK","EDIFICIO","REGLA","PELOTA",
  "CANASTO","ETIQUETA","HARINA","ZANAHORIA","MONITOR",
  "TELEVISOR","TELEFONO","OTORRINO","MARSUPIAL", "LLAVES"
];
var arrLetrasIngresadas = [];
var ultimoIndice = 0;
var intentosCounter = 0;
var indice = -1;
var palabraSecreta = "";
var palabraControl = "";

/**
* enlazo los elementos html a utilizar
* las declaro como constantes
*/
const sectionInicio = document.querySelector(".inicio");
//const modalJuego = document.getElementById("modal-juego");
const sectionJugar = document.querySelector(".jugar");
const divPalabra = document.querySelector(".palabra");
const letrasIngresadas = document.querySelector(".letras-ingresadas");
const ModalGameOver = document.querySelector("#gameOver");
const ModalGameOverP = document.querySelector("#gameOver-p");
const ModalGameOverPalabra = document.querySelector("#gameOver-palabra");

/**
* CANVAS
*/
const areaCanvas = document.querySelector(".canvas-area");
var pincel = areaCanvas.getContext("2d");  // creo el canvas
var x =  areaCanvas.offsetLeft;
var y =  areaCanvas.offsetTop;
var x2 = areaCanvas.offsetWidth;
var y2 = areaCanvas.offsetHeight;

function dibujoCanvas(){
  pincel.clearRect(0, 0, areaCanvas.width,areaCanvas.height)
  console.log("pinto canvas");
  pincel.fillStyle = "#e7e1e1";
  pincel.fillRect(0,0,x2,y2);
}


/* HABILITO LA SECCION JUGAR Y OCULTO LA DE INICIO */
function jugar(){
  limpiarVariables();
  dibujoCanvas();
  sectionInicio.style.display = "none";
  sectionJugar.style.display = "block";
  indice = -1;
  while(indice < 0 || indice >= arrPalabras.length ){
    indice = (Math.round(Math.random()*(arrPalabras.length-1))); // Creo un indice al azar
    //(indice != ultimoIndice) ? ultimoIndice = -1 : ultimoIndice = indice;  
    if (indice != ultimoIndice){// verifico que no sea el indice del juego anterior
      ultimoIndice = indice;
      palabraSecreta = arrPalabras[indice];
      break;
    } 
  }
    
  //console.log("LA PALABRA ES: ",arrPalabras[indice]);
    letrasCounter = arrPalabras[indice].length;
    divPalabra.innerHTML = "";
    
    for (let c = 0; c < arrPalabras[indice].length; c++ ){
      const nuevoDiv = document.createElement("div");
      nuevoDiv.style.display = "inline-block";
      nuevoDiv.setAttribute("class", "letrasPalabra");
      //console.log(nuevoDiv, arrPalabras[indice].length);
      //console.log("agrego el div", c);
      divPalabra.appendChild(nuevoDiv);
    }
    //console.log(palabra);
}

/**
* Modal Agregar Palabra
*/
const modalOK = document.querySelector("#modal-ok");
const modalAP = document.querySelector("#modal-ingresoPalabra");
const modalAbandonar = document.querySelector("#modal-abandonar");
const openModal = document.querySelector(".abrir-btn");
const closeModal = document.querySelector(".cerrar-btn");
const h2modal = document.querySelector("#h2-modal");

function guardarPalabra(){
  let inputIngPalabra = (document.querySelector("#input-agregoPalabra"));
  const pmodal = document.getElementById("modal-p");
  let palabra = inputIngPalabra.value.toUpperCase();
  let control = false;
  if (palabra != ""){
    control = true;
    for (let i in palabra){
      console.log(palabra.charCodeAt(i), " i ", i);
      if (palabra.charCodeAt(i) < 65 || palabra.charCodeAt(i) > 90){
        // console.log("FALSO ", palabra.charCodeAt(i), " i ", i);
        pmodal.style.color = "red";
        inputIngPalabra.focus();
        control=false;
        break;
      }
    }
  }else{
    pmodal.style.color = "red";
    inputIngPalabra.focus();
  }
  if (control) {
    arrPalabras.push(inputIngPalabra.value.toUpperCase());
    mostrarModal("Palabra guardada", "modalOK");
    inputIngPalabra.value = "";
    pmodal.style.color = "#000";
    inputIngPalabra.focus();
  }
};

/**
 * MODAL MOSTRAR / OCULTAR
 */
function mostrarModal(texto, modal){
  h2modal.innerHTML = texto+'<i class="fa-solid fa-circle-exclamation"></i>';
  if (modal == "modalOK"){
    modalOK.showModal();
  }else if (modal == "modalAP") {
    modalAP.showModal();
  }else if (modal == "modalAbandonar") {
    modalAbandonar.showModal();
  }
}

function cerrarModal(modal){
  if (modal == "modalOK"){
    modalOK.close();
  }else if (modal == "modalAP") {
    modalAP.close();
  }else if (modal == "modalAbandonar") {
    modalAbandonar.close();

  }
};

/* MOSTRAR MODAL ABANDONAR PARTIDA */
function abandonarPartida(){
  mostrarModal("", "modalAbandonar");
};
/* SALIDA PARTIDA */
function limpiarVariables(){
  cerrarModal("modalAbandonar");
  sectionInicio.style.display = "block";
  sectionJugar.style.display = "none";
  arrLetrasIngresadas = [];
  ultimoIndice = 0;
  intentosCounter = 0;
  indice = -1;
  palabraSecreta = "";
  palabraControl = "";
  divPalabra.innerHTML = "";
  letrasIngresadas.innerHTML = "";
  //esto no  window.location.reload()
};


/* DURANTE EL JUEGO */

document.addEventListener("keyup", (key)=>{
  
  if(intentosCounter < 10){
    let letra = key.key;
    let controlLetraExiste = false;
    letra = letra.toLocaleUpperCase();

    if (((letra.charCodeAt(0) >= 65 && letra.charCodeAt(0) <= 90) || letra.charCodeAt(0) == 209) && letra.length == 1){
      //veo si ya lo ingreso
      arrLetrasIngresadas.forEach((letraArr) =>{
        if (letraArr == letra) controlLetraExiste = true;
      });

      if (!controlLetraExiste){
        arrLetrasIngresadas.push(letra);
        // veriffico si la letra esta en la palabra
        letrasIngresadas.innerHTML = letrasIngresadas.innerHTML + " " + letra;
        
        if (palabraSecreta.includes(letra)){
          let divsLetrasPalabra = document.querySelectorAll(".letrasPalabra");
          
          divsLetrasPalabra.forEach((div, indice) =>{
            if (palabraSecreta[indice] == letra){
              palabraControl += letra;
              div.innerHTML = letra;
              // controlo su adivino la palabra
              if (palabraSecreta.length == palabraControl.length){
                intentosCounter = 11;
                // habilito el modal
                gameOver(palabraSecreta, palabraControl, 0);
              }
            }
          });
        }else{
          // dibujo la parte dependiendo del intento
          dibujar();
          // controlo si llego al limite de intentos y perdio el juego
          if (intentosCounter == 10) {
            gameOver(palabraSecreta, palabraControl, intentosCounter);
          }
        }
      }
    }
  }
})

function gameOver(_palabraSecreta, _palabraControl, _intentoscounter){
  ModalGameOver.style.display = "block";
    if(_palabraSecreta.length = _palabraControl.length && _intentoscounter == 0){
      ModalGameOverP.innerHTML = "Fin del juego!";
      ModalGameOverPalabra.innerHTML = "Ganaste, Felicidades!";
    }else {
      ModalGameOverP.innerHTML = "Fin del juego, PERDISTE!";
      console.log(ModalGameOverPalabra);
      ModalGameOverPalabra.innerHTML = `La palabra es: ${_palabraSecreta}!`;
    }
}

function dibujar(){
  intentosCounter++;
  //console.log(intentosCounter);
  if (intentosCounter < 5){
    pincel.fillStyle = "#000"
  }else{
    pincel.fillStyle = "red";
    pincel.lineWidth = 2;
    pincel.strokeStyle = 'red';
  }
                    
  switch(intentosCounter){
    case 1:{
      pincel.fillRect(25, 140, 250, 4);// suelo
      break;
    }
    case 2:{
      pincel.fillRect(85, 30, 4, 110);// columna
      break;
    }
    case 3:{
      pincel.fillRect(85, 30, 70, 4);// viga 
      break;
    }
    case 4:{
      pincel.fillRect(150, 34, 5, 15);// cuerda  
      break;
    }
    case 5:{ //cuerpo
      pincel.beginPath();// cabeza
      pincel.arc(152 , 50, 10 ,0 , 2*3.14);
      pincel.fill();
      break;
    }
    case 6:{
      pincel.fillRect(151, 60, 2, 35);// tronco
      break;
    }
    case 7:{
      pincel.moveTo(151, 70);//brazo derecho
      pincel.lineTo(135, 80);
      pincel.stroke();
      break;
    }
    case 8:{
      pincel.moveTo(152, 70);//brazo izquierdo
      pincel.lineTo(169, 80);
      pincel.stroke();
      break;
    }
    case 9:{
      pincel.moveTo(152, 94);//pierna derecha
      pincel.lineTo(140, 125);
      pincel.stroke();
      break;
    }
    case 10:{
      pincel.moveTo(152, 94);//pierna izquierda
      pincel.lineTo(164, 125);
      pincel.stroke();
      break;
    }
  }
}

function ocultar(){
  ModalGameOver.style.display = "none";
}
