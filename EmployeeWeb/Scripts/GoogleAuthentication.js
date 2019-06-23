/// <reference path="jquery-1.10.2.min.js" />

function getAccessToken(){
    if (location.hash){
        if (location.hash.split('acess_token=')){
            var acessToken=location.hash.split('acess_token=')[1].split('&')[0];
            if (acessToken){
                isUserRegistered(acessToken);
            }
        }
    }
}

function isUserRegistered(acessToken) {
    $.ajax({
        url: '/api/Account/UserInfo',
        method: 'GET',
        headers: {
            'content-type': 'application/JSON',
            'Authorization' : 'Bearer '+ acessToken
        },
        success: function (response) {
            if (response.HasRegistered) {
                localStorage.setItem('accessToken', acessToken);
                localStorage.setItem('userName', response.Email);
                window.location.href = "Data.html";
            }
            else {
                signupExternalUser(acessToken);
            }
        }
   })
}

function signupExternalUser(acessToken) {
    $.ajax({
        url: '/api/Account/RegisterExternal',
        method: 'POST',
        headers: {
            'content-type': 'application/JSON',
            'Authorization': 'Bearer ' + acessToken
        },
        success: function (response) {
            window.location.href = "/api/Account/ExternalLogin?provider=Google&response_type=token&client_id=self&redirect_uri=http%3A%2F%2Flocalhost%3A51560%2Flogin.html&state=j-F8WhydB_ohZ8rvwwU95SjbG4nZawMod6OV1EpXnuU1";
        }
    })
}