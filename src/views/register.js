import { registerUser } from "../services/users";

export { generarRegistro };

function generarRegistro() {
    const divRegister = document.createElement('div');

    divRegister.innerHTML = `
    <section class="vh-100 gradient-custom">
    <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                <div class="card bg-dark text-white" style="border-radius: 1rem;">
                    <div class="card-body p-5 text-center">

                        <div class="mb-md-5 mt-md-4 pb-5">

                            <h2 class="fw-bold mb-2 text-uppercase">Registro</h2>

                            <div class="form-outline form-white mb-4">
                                <label for="email" class="form-label">Correo electrónico:</label>
                                <input type="email" class="form-control form-control-lg" id="email" placeholder="Ingrese su correo electrónico">
                            </div>

                            <div class="form-outline form-white mb-4">
                                <label for="password" class="form-label">Contraseña:</label>
                                <input type="password" class="form-control form-control-lg" id="password" placeholder="Ingrese su contraseña">
                            </div>

                            <div class="form-outline form-white mb-4">
                                <label for="confirm-password" class="form-label">Confirmar contraseña:</label>
                                <input type="password" class="form-control form-control-lg" id="confirm-password" placeholder="Confirme su contraseña">
                            </div>

                            <button class="btn btn-outline-light btn-lg px-5" id="submit" type="submit">Registrarse</button>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

    `;

    divRegister.querySelector('#submit').addEventListener('click', async (event) => {
        event.preventDefault();
        const email = divRegister.querySelector('#email').value;
        const password = divRegister.querySelector('#password').value;
        const dataRegister = registerUser(email, password);
        console.log(dataRegister);
    });

    return divRegister;
}
