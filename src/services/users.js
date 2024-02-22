import {
    fileRequest,
    getData,
    getFileRequest,
    loginSupabase,
    signUpSupabase,
    updateData
} from "./http";

export {
    registerUser,
    loginUser,
    getProfile,
    updateProfile
};

function registerUser(email, password) {
    const status = { success: false };

    try {
        signUpSupabase(email, password).then((dataRegister) => {
            console.log(dataRegister);
            status.success = true;
        });
        window.location.hash = '/#/login';
    } catch (err) {
        console.log(err);
        status.success = false;
        status.errorText = err;
    }
    
    return status;
    
}

async function loginUser(email, password) {
    const status = { success: false };

    try {
        const dataLogin = await loginSupabase(email, password);
        console.log(dataLogin);

        localStorage.setItem('access_token', dataLogin.access_token);
        localStorage.setItem('uid', dataLogin.user.id);
        localStorage.setItem('email', dataLogin.user.email);
        localStorage.setItem('expirationDate', expirationDate(dataLogin.expires_in));

        status.success = true;
        window.location.hash = '/#/';
    } catch (err) {
        console.log(err);
        status.success = false;
        status.errorText = err.error_description;
    }

    return status;
}

function expirationDate(expires_in) {
    return Math.floor(Date.now() / 1000) + expires_in;
}

async function getProfile() {
    const access_token = localStorage.getItem('access_token');
    const uid = localStorage.getItem('uid');
    const responseGet = await getData(`profiles?id=eq.${uid}&select=*`, access_token);
    const { avatar_url } = responseGet[0];
    responseGet[0].avatar_blob = false;

    if (avatar_url) {
        const imageBlob = await getFileRequest(avatar_url, access_token);
        if (imageBlob instanceof Blob) {
            responseGet[0].avatar_blob = URL.createObjectURL(imageBlob);
        }
    }

    return responseGet;
}

async function updateProfile(profile) {
    const access_token = localStorage.getItem('access_token');
    const uid = localStorage.getItem('uid');
    const formImg = new FormData();
    formImg.append('avatar', profile.avatar, 'avatarProfile.png');
    console.log(formImg);
    const avatarResponse = await fileRequest(`/storage/v1/object/avatars/avatar${uid}.png`, formImg, access_token);
    profile.avatar_url = avatarResponse.urlAvatar;
    delete profile.avatar;
    const responseUpdate = await updateData(`profiles?id=eq.${uid}&select=*`, access_token, profile);
}
