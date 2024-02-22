import { getProfile, updateProfile } from '../services/users';

export { profileForm };

function profileForm() {

    const divProfile = document.createElement('div');

    getProfile().then((dataProfile) => {
        dataProfile = dataProfile[0];
        //console.log(dataProfile);

        divProfile.innerHTML = `
<div class="row">
    <div class="col d-flex justify-content-center">
        <div class="card mt-5 bg-dark text-white" style="border-radius: 1rem; width: 80%;">
            <div class="card-header">
                <h3 class="text-center">Perfil</h3>
            </div>
            <div class="card-body">
                <form action="action_page.php" id="formProfile">
                <div class="form-group">
                <p id="errors"></p>
            </div>
            <div class="form-outline form-white mb-4">
                <label for="email" class="form-label"><b>Email</b></label>
                <input
                    id="signupemail"
                    type="text"
                    placeholder="Enter Email"
                    name="email"
                    required
                    readonly
                    value="${localStorage.getItem('email')}"
                    class="form-control form-control-lg"
                />
            </div>
            <div class="form-outline form-white mb-4">
                <label for="psw" class="form-label"><b>Password</b></label>
                <input
                    type="password"
                    id="signuppassword"
                    placeholder="Enter Password"
                    name="psw"
                    required
                    class="form-control form-control-lg"
                />
            </div>
            <div class="form-outline form-white mb-4">
                <label for="psw-repeat" class="form-label"><b>Repeat Password</b></label>
                <input
                    type="password"
                    placeholder="Repeat Password"
                    name="psw-repeat"
                    required
                    class="form-control form-control-lg"
                />
            </div>
            <div class="text-center">
                <button type="button" class="btn btn-outline-light btn-lg px-5" id="chgpass">Change Password</button>
            </div>
            <div class="form-outline form-white mb-4">
                <label for="username" class="form-label"><b>Username</b></label>
                <input
                    type="text"
                    placeholder="user name"
                    name="username"
                    id="username"
                    value="${dataProfile.username}"
                    class="form-control form-control-lg"
                />
            </div>
            <div class="form-outline form-white mb-4">
                <label for="fullname" class="form-label"><b>Full Name</b></label>
                <input
                    type="text"
                    placeholder="fullname"
                    name="full_name"
                    value="${dataProfile.full_name}"
                    class="form-control form-control-lg"
                />
            </div>
            <div class="form-outline form-white mb-4">
                <label for="web" class="form-label"><b>Web Site</b></label>
                <input
                    type="text"
                    placeholder="web"
                    name="website"
                    value="${dataProfile.website}"
                    class="form-control form-control-lg"
                />
            </div>
            <div class="form-group">
                <label for="avatar" class="form-label"><b>Avatar</b></label>
            </div>
            <div class="text-center">
                <img class="avatar_profile" style="max-width: 200px" id="avatar_prev"
                    src="${dataProfile.avatar_blob ? dataProfile.avatar_blob : ''}" />
            </div>
            <input
                type="file"
                id="avatar"
                name="avatar"
            />
            <div class="text-center mt-4">
                <button type="button" class="btn btn-outline-light btn-lg px-5" id="update">Update Profile</button>
            </div>
                </form>
            </div>
        </div>
    </div>
</div>
        `;

        divProfile.querySelector('#update').addEventListener('click', async () => {
            const formData = new FormData(divProfile.querySelector('#formProfile'));
            const {
                username, full_name, website, avatar,
            } = Object.fromEntries(formData);
            console.log({
                username, full_name, website, avatar,
            });

            const dataUpdate = await updateProfile({
                username, full_name, website, avatar,
            });

        });

        function encodeImageFileAsURL(element) {
            const file = element.files[0];
            if (file) {
                divProfile.querySelector('#avatar_prev').src = URL.createObjectURL(file);
            }
        }
        divProfile.querySelector('#avatar').addEventListener('change', function () {
            encodeImageFileAsURL(this);
        });

    });

    return divProfile;
}
