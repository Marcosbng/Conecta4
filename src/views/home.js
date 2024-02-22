import { create_game, list_my_games, search_game } from "../services/cuatrohttp";
import { getProfile } from "../services/users";
import '../css/style.css';
export { generarHome };

function generarHome() {

    const divHome = document.createElement('div');

    divHome.innerHTML =
        `    
        <div>
    <h1 class="main-title text-center">Bienvenido al Conecta 4 en Línea</h1>
    <div class="container text-center">
        <div class="button-container">
            <button type="submit" class="btn btn-primary btn-lg" id="submit_crear">Crear una Partida</button>
        </div>
        <div class="button-container">
            <button type="submit" class="btn btn-primary btn-lg" id="submit_buscar">Buscar una Partida</button>
        </div>
        <div class="button-container">
            <button type="submit" class="btn btn-primary btn-lg" id="submit_listar">Lista de Partidas</button>
        </div>
    </div>
    <div class="text-center" id="divGames"></div>
</div>

    `;

    divHome.querySelector('#submit_crear').addEventListener('click', async () => {
        await create_game();
    });

    divHome.querySelector('#submit_buscar').addEventListener('click', async () => {
        await search_game();
    });

    divHome.querySelector('#submit_listar').addEventListener('click', async () => {
        try {
            const dataGames = await list_my_games();

            const divGames = document.getElementById('divGames');
            divGames.innerHTML = ``;

            dataGames.forEach(({ id, game_state }) => {
                const divGame = document.createElement('div');
                divGame.classList.add('game-card');
                divGame.innerHTML =
                    `
                    <h2 class="game-title">Partida ${id}</h2>
                    <div class="player-names text-center">${game_state.nombreJugadores[1]} VS ${game_state.nombreJugadores[2]}</div>
                    <button class="play-button btn btn-success">Jugar</button>
                    `;
                divGames.appendChild(divGame);

                const playButton = divGame.querySelector('.play-button');
                playButton.addEventListener('click', () => {
                    window.location.assign(`#/4enRaya?${id}`);
                });
            });
        } catch (error) {
            console.error('Error fetching games:', error);
        }
    });

    return divHome;
}
