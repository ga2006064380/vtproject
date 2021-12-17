
const LayDarkToggle = document.querySelector('.dark-toggle-switch');
const LayIndexBgMain = document.querySelector('.lay-Index-bg-main');
const LayIndexBody = document.querySelector('.lay-Index-body-content');

const LayDarkSwitch = document.createElement('style');

//LayDarkToggle.addEventListener('click', function () {
//    if (document.body.classList.contains('Main-active')) {
//        document.body.classList.remove('Main-active');
//    } else {
//        document.body.classList.add('Main-active');
//    }
//})

const lightMode = localStorage.getItem("theme")

if (lightMode === "light") {
    enablelightMode();
}

LayDarkToggle.addEventListener('click', (e) => {
    darkMode = localStorage.getItem("theme")
    if (darkMode === 'dark') {
        enablelightMode();
    } else {
        disablelightMode();
    }
})

function enablelightMode() {
    document.body.classList.add("Main-active")
    localStorage.setItem('theme', 'light');
}

function disablelightMode() {
    document.body.classList.remove("Main-active")
    localStorage.setItem('theme', 'dark');
}
