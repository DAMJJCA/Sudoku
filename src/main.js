  import { fetchPuzzle } from './services/puzzleService.js';

  let tablero = [];
  let solucion = [];
  /* Datos del tablero (guárdalos como strings) */
    
    let numeroSeleccionado = null;
    const tableroDiv = document.getElementById('tablero');
    const numerosDiv = document.getElementById('numeros');
   
    function CrearBotones() {
      /* Crear botones 1..9 */
      numerosDiv.innerHTML = '';
      for (let n = 1; n <= 9; n++) {
        const numero = document.createElement('div');
        numero.classList.add('numero');
        numero.dataset.value = String(n);
        numero.innerText = n;
        numero.addEventListener('click', seleccionarNumero);
        numerosDiv.appendChild(numero);
      }
    }
    function CrearCasillas() {
      /* Crear casillas 9x9 */
       tableroDiv.innerHTML = '';
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          const casilla = document.createElement('div');
          casilla.id = `${r}-${c}`;
          casilla.classList.add('casilla');

          if (tablero[r][c] !== '-') {
            casilla.innerText = tablero[r][c];
            casilla.classList.add('inicio');
          }

          if (r === 2 || r === 5) casilla.classList.add('lineaHorizontal');
          if (c === 2 || c === 5) casilla.classList.add('lineaVertical');

          casilla.addEventListener('click', seleccionarCasilla);
          tableroDiv.appendChild(casilla);
        }
      }
    }

    function seleccionarNumero() {
      if (numeroSeleccionado) numeroSeleccionado.classList.remove('numero-seleccionado');
      numeroSeleccionado = this;
      numeroSeleccionado.classList.add('numero-seleccionado');
    }

    function seleccionarCasilla() {
      if (!numeroSeleccionado) return;              // sin número seleccionado no hacemos nada
      if (this.classList.contains('inicio')) return; // no sobreescribir casillas iniciales

      const [r, c] = this.id.split('-').map(Number);
      const valor = numeroSeleccionado.dataset.value; // '1'..'9'

      if (solucion[r][c] === valor) {
        this.innerText = valor;
        this.classList.remove('error');
        this.classList.add('correcto');
      } else {
        this.classList.add('error');
        setTimeout(() => this.classList.remove('error'), 350);
        alert('Valor incorrecto');
      }
    }

    async function iniciarJuego() {
      try {
        const data= await fetchPuzzle();
      tablero = data.tablero;
      solucion = data.solucion;
      CrearCasillas();
      CrearBotones();
      } catch (error) {
        alert('Error al cargar el puzzle: ' + error.message);
      }
  }

    window.onload = iniciarJuego;