import * as cuatro from "../functions/cuatro";
import { getProfile } from "./users";
import { createData, getData, updateData } from "./http";

// Exportación de funciones
export {
    create_game,
    search_game,
    list_my_games,
    get_game,
    updateGame
};

// Función para crear un nuevo juego
async function create_game() {
    try {
        const access_token = localStorage.getItem('access_token');
        const uid = localStorage.getItem('uid');
        const dataProfile = await getProfile();
        const username = dataProfile[0]?.username;

        if (!username) {
            console.error("No se pudo obtener el nombre de usuario del perfil.");
            return;
        }

        // Iniciar un nuevo juego con el usuario actual
        const state = cuatro.startGameUser(cuatro.gameState(), username);
        const data = {
            game_state: state,
            player_1: uid
        };

        // Crear el juego en la base de datos
        const responseUpdate = await createData("game_state", access_token, data);

        console.log("Juego creado correctamente:", responseUpdate);
    } catch (error) {
        console.error("Error durante la creación del juego:", error);
    }
}

// Función para obtener la información de un juego por su ID
async function get_game(id) {
    try {
        const access_token = localStorage.getItem('access_token');
        return await getData(`game_state?id=eq.${id}&select=*`, access_token);
    } catch (error) {
        console.error('Error al obtener el estado del juego:', error);
        return null;
    }
}

// Función para buscar y unirse a un juego disponible
async function search_game() {
    try {
        const access_token = localStorage.getItem('access_token');
        const uid = localStorage.getItem('uid');

        // Buscar juegos disponibles para unirse
        const data = await getData(`game_state?select=*&player_2=is.null&player_1=neq.${uid}`, access_token);

        if (data.length > 0) {
            const game_state = data[0];
            const state = game_state.game_state;
            const gameId = game_state.id;

            // Actualizar el juego con el segundo jugador
            await update_game_player(gameId, uid, state);
            console.log(game_state);
        } else {
            console.log("No se encontró un juego válido.");
        }

    } catch (error) {
        console.error("Error durante la búsqueda y actualización del juego:", error);
    }
}

// Función auxiliar para actualizar un juego con el segundo jugador
async function update_game_player(gameId, playerUid, state) {

    const access_token = localStorage.getItem('access_token');

    try {
        const dataProfile = await getProfile();
        const profile = dataProfile[0];

        if (profile) {
            state.nombreJugadores[2] = profile.username;
            const data = {
                player_2: playerUid,
                game_state: state
            }

            // Actualizar el juego en la base de datos
            await updateData(`game_state?id=eq.${gameId}`, access_token, data);
        } else {
            console.error("No se pudo obtener el perfil del jugador.");
        }
    } catch (error) {
        console.error("Error al obtener el perfil del jugador:", error);
    }

}

// Función para actualizar el estado de un juego
async function updateGame(gameId, state) {
    try {
        const access_token = localStorage.getItem('access_token');
        // Actualizar el juego en la base de datos con el nuevo estado
        await updateData(`game_state?id=eq.${gameId}`, access_token, {game_state: state});
        console.log(`Juego con ID ${gameId} actualizado correctamente.`);
    } catch (error) {
        console.error(`Error durante la actualización del juego con ID ${gameId}:`, error);
    }
}

// Función para listar los juegos del usuario
async function list_my_games() {

    try {
        const access_token = localStorage.getItem('access_token');
        const uid = localStorage.getItem('uid');
        // Obtener juegos en los que el usuario participa como jugador 1 o jugador 2
        const data = await getData(`game_state?select=*&or=(player_1.eq.${uid},player_2.eq.${uid})`, access_token);
        console.log("Juegos del usuario:", data);
        return data;
    } catch (error) {
        console.error("Error al obtener juegos del usuario:", error);
    }

}
