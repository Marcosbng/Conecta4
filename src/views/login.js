import { loginUser } from "../services/users";

export { generarLogin };

function generarLogin() {
    const divLogin = document.createElement('div');

    divLogin.innerHTML = `
        <section class="vh-100 gradient-custom">
            <div class="container py-5 h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div class="card bg-dark text-white" style="border-radius: 1rem;">
                            <div class="card-body p-5 text-center">

                                <div class="mb-md-5 mt-md-4 pb-5">

                                    <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                                    <p class="text-white-50 mb-5">Por favor introduzca el correo y contraseña!</p>

                                    <div class="form-outline form-white mb-4">
                                        <input type="email" id="email" class="form-control form-control-lg" />
                                        <label class="form-label" for="email">Email</label>
                                    </div>

                                    <div class="form-outline form-white mb-4">
                                        <input type="password" id="current-password" class="form-control form-control-lg" />
                                        <label class="form-label" for="password">Password</label>
                                    </div>

                                    <p class="small mb-5 pb-lg-2"><a class="text-white-50" href="#!">Contraseña olvidada?</a></p>

                                    <button class="btn btn-outline-light btn-lg px-5" id="submit" type="submit">Login</button>

                                </div>

                                <div>
                                    <p class="mb-0">No tienes cuenta? <a href="#/register" class="text-white-50 fw-bold">Registrarse</a></p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;

    divLogin.querySelector('#submit').addEventListener('click', async (event) => {
        event.preventDefault();
        const email = divLogin.querySelector('#email').value;
        const password = divLogin.querySelector('#current-password').value;
        loginUser(email, password).then((status) => {
            if (status.success) window.location.hash = '#/';
            else {
                divLogin.querySelector('#errors').innerHTML = status.errorText;
            }
        });
    });

    return divLogin;
}
