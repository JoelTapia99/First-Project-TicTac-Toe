var tablero;
const jugador = 'X';
const computador = 'O';
const reglas = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]//reglas

const celdas = document.querySelectorAll('.cell');
iniciar();//llamo ala funcion sartgame

function iniciar() {
	document.querySelector(".endgame").style.display = "none";//los estilos css no siguen nulos
	tablero = Array.from(Array(9).keys());//creo un array
	for (var i = 0; i < celdas.length; i++) {
		celdas[i].innerText = '';//la celda sta vacia
		celdas[i].style.removeProperty('background-color');//elimino el color de fondo de cada celda
		celdas[i].addEventListener('click', GiroTurno, false);
	}
}

function GiroTurno(square) {
	if (typeof tablero[square.target.id] == 'number') {
		turno(square.target.id, jugador)
		if (!VerificaWin(tablero, jugador) && !empate()) turno(bestSpot(), computador);
	}
}

function turno(a, persona) {
	tablero[a] = persona;
	document.getElementById(a).innerText = persona;
	let JuegoGanado = VerificaWin(tablero, persona)//let(variable) atrapo en la variable JuegoGanado la funcion checkwin
	if (JuegoGanado) FinJuego(JuegoGanado)//determina si alguien ya ha ganado
}

function VerificaWin(board, persona) {
	let juegos = board.reduce((a, e, i) => //encuentra todos los lugares del tablero
		(e === persona) ? a.concat(i) : a, []);
	let JuegoGanado = null;
	for (let [index, win] of reglas.entries()) {
		if (win.every(elem => juegos.indexOf(elem) > -1)) {//digo que el jugador ha jugado una de las formas para ganar
			JuegoGanado = {index: index, persona: persona};
			break;
		}
	}
	return JuegoGanado;
}

function FinJuego(JuegoGanado) {
	for (let index of reglas[JuegoGanado.index]) {
		document.getElementById(index).style.backgroundColor =
        JuegoGanado.persona == jugador ? "blue" : "red";
	}
	for (var i = 0; i < celdas.length; i++) {
		celdas[i].removeEventListener('click', GiroTurno, false);
	}
	DeclararGanador(JuegoGanado.persona == jugador ?  "Eres el ganador!" : "Has perdido!");
}

function DeclararGanador(who) {
	document.querySelector(".endgame").style.display = "block";
	document.querySelector(".endgame .text").innerText = who;
}

function CuadrosVacios() {
	return tablero.filter(s => typeof s == 'number');
}

function bestSpot() {
	return minimax(tablero, computador).index;
}

function empate() {
	if (CuadrosVacios().length == 0) {
		for (var i = 0; i < celdas.length; i++) {
			celdas[i].style.backgroundColor = "green";
			celdas[i].removeEventListener('click', GiroTurno, false);
		}
		DeclararGanador("Esto es un empate")
		return true;
	}
	return false;
}

function minimax(newBoard, persona) {
	var availSpots = CuadrosVacios();

	if (VerificaWin(newBoard, jugador)) {
		return {score: -10};
	} else if (VerificaWin(newBoard, computador)) {
		return {score: 10};
	} else if (availSpots.length === 0) {
		return {score: 0};
	}
	var moves = [];
	for (var i = 0; i < availSpots.length; i++) {
		var move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = persona;

		if (persona == computador) {
			var result = minimax(newBoard, jugador);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, computador);
			move.score = result.score;
		}

		newBoard[availSpots[i]] = move.index;

		moves.push(move);
	}

	var bestMove;
	if(persona === computador) {
		var bestScore = -10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	return moves[bestMove];
}
