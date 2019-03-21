let username;

function getUsername() {
    const searchfield = document.querySelectorAll('.search_1');
    const passedValue = searchfield[0].value;
    return passedValue;
}

function getUsernameOnClick() {
    const searchBtn = document.querySelectorAll('.submit_1');
    searchBtn[0].addEventListener('click', function() {
        const passedValue = getUsername();
        passUsernameToApi(passedValue);
        loadUser();
    });
}

function getUsernameOnEnter() {
    const searchfield = document.querySelectorAll('.search_1');
    searchfield[0].addEventListener('keydown', function(e) {
        const key = e.which || e.keyCode;
        if(key === 13) {
            const passedValue = getUsername();
            passUsernameToApi(passedValue);
            loadUser();
        }
    });
}

function passUsernameToApi(element) {
    const passedValue = getUsername();
    username = passedValue;
}

getUsernameOnClick();
getUsernameOnEnter();


function loadUser () {
    fetch(`https://api.github.com/users/${username}`)
        .then(response => {
            if(!response.ok) {
                alert('User not found');
            }
           return response.json()
        })
        .then(user => {
            loadEverything(user);
        })
}

function loadEverything(user) {
    loadPhoto(user);
    loadNickname(user);
    loadFullname(user);
    loadLocation(user);
    loadRepos(user);
    loadFollowers(user);
}

function loadPhoto(user) {
    const photoContainer = document.querySelectorAll('.photoContainer');
    photoContainer[0].style.backgroundImage = `url('${user.avatar_url}')`
}

function loadNickname(user) {
    const nicknameSpan = document.querySelectorAll('.apiNickname');
    nicknameSpan[0].innerText = user.login;
}

function loadFullname(user) {
    const fullnameSpan = document.querySelectorAll('.apiFullname');
    fullnameSpan[0].innerText = user.name
}

function loadLocation(user) {
    const locationSpan = document.querySelectorAll('.apiLocation');
    locationSpan[0].innerText = user.location;
}

function loadRepos(user) {
    const reposSpan = document.querySelectorAll('.apiRepos');
    reposSpan[0].innerText = user.public_repos;
}

function loadFollowers(user) {
    const followersSpan = document.querySelectorAll('.apiFollowers');
    followersSpan[0].innerText = user.followers;
}