// Public/main.js
import { fetchPuzzle } from './services/puzzleService.js';

let tablero = [];
let solucion = [];
let numeroSeleccionado = null;

async function iniciarJuego() {
  try {
    const data = await fetchPuzzle();
    // data.tablero y data.solucion vienen como arrays de strings
    tablero = data.tablero.map(row => row.split(''));
    solucion = data.solucion.map(row => row.split(''));
    Juego();
  } catch (error) {
    console.error(error);
    alert('Error al cargar el puzzle: ' + error.message);
  }
}

function crearTablero() {
  const cont = document.getElementById('tablero');
  cont.innerHTML = '';
  for (let r = 0; r < 9; r++) {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'fila';
    for (let c = 0; c < 9; c++) {
      const cell = document.createElement('div');
      cell.className = 'celda';
      cell.id = `${r}-${c}`;
      const val = tablero[r][c];
      if (val !== '0' && val !== '.') { // asumiendo 0 o . como vacíos
        cell.innerText = val;
        cell.classList.add('fijo');
      } else {
        cell.innerText = '';
        cell.classList.add('editable');
        cell.addEventListener('click', onCellClick);
      }
      rowDiv.appendChild(cell);
    }
    cont.appendChild(rowDiv);
  }
}

function crearNumeros() {
  const cont = document.getElementById('numeros');
  cont.innerHTML = '';
  for (let n = 1; n <= 9; n++) {
    const btn = document.createElement('button');
    btn.innerText = n;
    btn.dataset.value = String(n);
    btn.addEventListener('click', () => {
      // destaco el seleccionado
      if (numeroSeleccionado) numeroSeleccionado.classList.remove('seleccionado');
      numeroSeleccionado = btn;
      btn.classList.add('seleccionado');
    });
    cont.appendChild(btn);
  }
}

function onCellClick(ev) {
  if (!numeroSeleccionado) {
    alert('Selecciona un número primero');
    return;
  }
  const cell = ev.currentTarget;
  const [r, c] = cell.id.split('-').map(Number);
  const valor = numeroSeleccionado.dataset.value;

  if (solucion && solucion[r] && solucion[r][c] === valor) {
    cell.innerText = valor;
    cell.classList.remove('error');
    cell.classList.add('correcto');
  } else {
    cell.classList.add('error');
    setTimeout(() => cell.classList.remove('error'), 350);
    // no reemplazo el valor si es incorrecto
    alert('Valor incorrecto');
  }
}

function Juego() {
  crearTablero();
  crearNumeros();
}

// Registrar correcto en DOMContentLoaded
document.addEventListener('DOMContentLoaded', iniciarJuego);
