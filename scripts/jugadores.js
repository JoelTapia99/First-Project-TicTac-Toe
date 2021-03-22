var bandera= false; //indica si el juego inicio(i)(aun no inicia)
var turno=0; //turno de cada Jugador
var tablero=new Array(); //array de botones
window.onload=function(){
  var iniciar=document.getElementById("iniciar");
  iniciar.addEventListener("click",comenzar);
}
// la funcion comenzar hace que cuando se de clic en iniciar los botones cambien
function comenzar(){
  bandera=true;//(i)El juego ya inicia
  var jugador1=document.getElementById("jugador1");
  var jugador2=document.getElementById("jugador2");
  if(jugador1.value==""){
    alert("Falta el nombre del jugador 1")
    jugador1.focus();
  }else {
    if(jugador2.value==""){
      alert("Falta el nombre del jugador 2")
      jugador2.focus();
    }else {
      tablero[0]=document.getElementById("boton0");
      tablero[1]=document.getElementById("boton1");
      tablero[2]=document.getElementById("boton2");
      tablero[3]=document.getElementById("boton3");
      tablero[4]=document.getElementById("boton4");
      tablero[5]=document.getElementById("boton5");
      tablero[6]=document.getElementById("boton6");
      tablero[7]=document.getElementById("boton7");
      tablero[8]=document.getElementById("boton8");
      for (var i = 0; i < 9; i++) {
        tablero[i].className="botonInicial";//cuando el usuario de click en el bonton, los cambias css se aplican(48)
        tablero[i].value="I";
      }
      turno=1;
      document.getElementById("TurnoJugador").innerHTML="Es el turno de "+jugador1.value;
    }
  }
}
// coloca la ficha sehun el jugador.
function colocar(boton){
if (bandera==true){
  if(turno==1 && boton.value=="I"){
    turno=2;
    document.getElementById("TurnoJugador").innerHTML="Es el turno de "+jugador2.value;
    boton.value="X";
    boton.className="botonJugador1";
  }else {
    if(turno==2 && boton.value=="I"){
      turno=1;
      document.getElementById("TurnoJugador").innerHTML="Es el turno de "+jugador1.value;
      boton.value="O";
      boton.className="botonJugador2";
    }
  }
validar();
}

}
// Valido posicion de fichas y determino el jugador
function validar(){
  if((tablero[0].value=="X" && tablero[1].value=="X" && tablero[2].value=="X")   // Validacion Horizontal
    || (tablero[3].value=="X" && tablero[4].value=="X" && tablero[5].value=="X")
    || (tablero[6].value=="X" && tablero[7].value=="X" && tablero[8].value=="X")
    || (tablero[0].value=="X" && tablero[3].value=="X" && tablero[6].value=="X") //Validacion Vertical
    || (tablero[1].value=="X" && tablero[4].value=="X" && tablero[7].value=="X")
    || (tablero[2].value=="X" && tablero[5].value=="X" && tablero[8].value=="X")
    || (tablero[0].value=="X" && tablero[4].value=="X" && tablero[8].value=="X")//validacion en X
    || (tablero[2].value=="X" && tablero[4].value=="X" && tablero[6].value=="X")){
        puntaje+=1
      document.getElementById("TurnoJugador").innerHTML="El ganador es "+jugador1.value;
      document.getElementById("puntaje1").innerHTML=puntaje;

      bandera=false;
    }
  if((tablero[0].value=="O" && tablero[1].value=="O" && tablero[2].value=="O")   // Validacion Horizontal
      || (tablero[3].value=="O" && tablero[4].value=="O" && tablero[5].value=="O")
      || (tablero[6].value=="O" && tablero[7].value=="O" && tablero[8].value=="O")
      || (tablero[0].value=="O" && tablero[3].value=="O" && tablero[6].value=="O") //Validacion Vertical
      || (tablero[1].value=="O" && tablero[4].value=="O" && tablero[7].value=="O")
      || (tablero[2].value=="O" && tablero[5].value=="O" && tablero[8].value=="O")
      || (tablero[0].value=="O" && tablero[4].value=="O" && tablero[8].value=="O")//validacion en X
      || (tablero[2].value=="O" && tablero[4].value=="O" && tablero[6].value=="O")){
          puntaje_2+=1
        document.getElementById("TurnoJugador").innerHTML="El ganador es "+jugador2.value;
        document.getElementById("puntaje2").innerHTML=puntaje_2;

        bandera=false;
      }
  }
  var puntaje=0;
  var puntaje_2=0;
  function reiniciar(){
    puntaje=0;
    puntaje_2=0;
    document.getElementById("puntaje1").innerHTML=puntaje;
    document.getElementById("puntaje2").innerHTML=puntaje_2;
  }
function final(){
  if (puntaje<puntaje_2){
    document.getElementById("TurnoJugador").innerHTML="El ganador es "+jugador2.value;
  }
  else if (puntaje>puntaje_2){
    document.getElementById("TurnoJugador").innerHTML="El ganador es "+jugador1.value;

  }else {
    document.getElementById("TurnoJugador").innerHTML="Es un EMPATE";
  }
}
