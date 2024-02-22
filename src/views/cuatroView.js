import * as cuatro from '../functions/cuatro.js';
import { get_game } from "../services/cuatrohttp";

export { generar4EnRaya };

function generar4EnRaya(id) {
    const divCuatro = document.createElement('div');

    // Función para crear celdas de una fila
    function createRowCells(rowData) {
        return rowData.map((cellValue) => {
            let cellClass = 'cell';
            if (cellValue === 'red') {
                cellClass += ' red';
            } else if (cellValue === 'yellow') {
                cellClass += ' yellow';
            } else if (cellValue === 'empty') {
                cellClass += ' empty';
            }
            return `<td class="${cellClass}"></td>`;
        }).join("");
    }

    // Función para crear filas de la tabla a partir del estado del juego
    function createTableRows(state) {
        return state.tablero.map((rowData) => `<tr>${createRowCells(rowData)}</tr>`).join("");
    }

    // Función para manejar el clic en una celda vacía
    function handleCellClick(cell, state, id) {
        if (cell.style.backgroundColor === '' || cell.style.backgroundColor === 'white') {
            const fila = cell.parentElement.rowIndex - 1;
            const columna = cell.cellIndex;

            // Alternar el jugador actual y manejar el clic en el módulo cuatro
            if (state.cont === 0) {
                cuatro.manejarClic(state, fila, columna, id);
                state.cont = 1;
            } else {
                cuatro.manejarClic(state, fila, columna, id);
                state.cont = 0;
            }
        }
    }

    // Obtener el estado del juego mediante la función get_game
    get_game(id).then((data) => {
        // Extraer el primer elemento del array de datos
        const state = data[0]?.game_state;

        if (state) {
            const tableRows = createTableRows(state);

            divCuatro.innerHTML =
                `
                <h1>4 en Línea</h1>
                <div id="div_tablero">
                    <table id="tablero">
                        ${tableRows}
                    </table>
                    <button id="reiniciar-button">Reiniciar Partida</button>
                </div>
                `;

            document.addEventListener('click', (event) => {
                const reiniciarButton = document.getElementById('reiniciar-button');
                const clickedCell = event.target;

                // Agregar evento de clic al botón de reiniciar
                if (reiniciarButton) {
                    reiniciarButton.addEventListener('click', () => {
                        // Llamar a la función resetGame del módulo cuatro
                        cuatro.resetGame(state);
                    });
                }

                // Manejar clics en celdas vacías
                if (clickedCell.classList.contains('cell') && clickedCell.classList.contains('empty')) {
                    handleCellClick(clickedCell, state, id);
                }
            });
        }
    });

    return divCuatro;
}
