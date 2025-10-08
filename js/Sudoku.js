/* Datos del tablero (guárdalos como strings) */
    const tablero = [
      "--74916-5",
      "2---6-3-9",
      "-----7-1-",
      "-586----4",
      "--3----9-",
      "--62--187",
      "9-4-7---2",
      "67-83----",
      "81--45---"
    ];
    const solucion = [
      "387491625",
      "241568379",
      "569327418",
      "758619234",
      "123784596",
      "496253187",
      "934176852",
      "675832941",
      "812945763"
    ];

    let numeroSeleccionado = null;

    function Juego() {
      const tableroDiv = document.getElementById('tablero');
      const numerosDiv = document.getElementById('numeros');
      tableroDiv.innerHTML = '';
      numerosDiv.innerHTML = '';

      /* Crear botones 1..9 */
      for (let n = 1; n <= 9; n++) {
        const numero = document.createElement('div');
        numero.classList.add('numero');
        numero.dataset.value = String(n); // Interesante manera de parsear el número
        numero.innerText = n;
        numero.addEventListener('click', seleccionarNumero);
        numerosDiv.appendChild(numero);
      }

      /* Crear casillas 9x9 */
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

    document.addEventListener('DOMContentLoaded', Juego);