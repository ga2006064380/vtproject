const LayIndextoggleBtn = document.querySelector(".lay-Index-sidebar-toggle");
const LayIndexsidenav = document.querySelector('.lay-Index-sidenav');

const LayIndexsidebtn = document.querySelector('.lay-Index-side-search-btn');
const LayIndexsidesearch = document.querySelector('.lay-Index-side-search');
const LayIndexsideInput = document.querySelector('.lay-Index-side-input');

const LayIndexbodymask = document.querySelector('.lay-Index-mask');

LayIndextoggleBtn.addEventListener('click', function () {
    // if (sidenav.classList.contains('show-sidenav')) {
    //     sidenav.classList.remove('show-sidenav')
    // } else {
    //     sidenav.classList.add('show-sidenavr')
    // }
    LayIndexsidenav.classList.toggle('show-sidebar');

    if (LayIndexsidenav.classList.contains('show-sidenav')) {
        LayIndexsidenav.style.width = "100%";
    }


    if (document.body.clientWidth > 640) {
        LayIndexbodymask.classList.toggle('add-mask');
        if (LayIndexsidenav.style.width === "250px") {
            LayIndexsidenav.style.fontSize = "1.1rem";
            LayIndexsidenav.style.width = "80px";
        } else {
            LayIndexsidenav.style.width = "250px";
            LayIndexsidenav.style.fontSize = "1.25rem";
        }
    }
})

LayIndexbodymask.addEventListener('click', function () {
    if (LayIndexbodymask.classList.contains('add-mask')) {
        LayIndexbodymask.classList.remove('add-mask')
    }
    if (LayIndexsidenav.style.width = "250px") {
        LayIndexsidenav.style.width = "80px";
    }
})

LayIndexsidebtn.addEventListener('click', function () {
    LayIndexsidesearch.classList.toggle('show-search');
})

if (document.body.clientWidth < 640) {
    LayIndexsidenav.style.fontSize = "1.25rem";
}

window.onresize = function () {
    if (document.body.clientWidth > 640) {
        LayIndexsidesearch.classList.remove('show-search')

        if (LayIndexsidenav.style.width = "250px") {
            LayIndexbodymask.classList.add('add-mask');
        }
        if (LayIndexsidenav.style.width === "100%") {
            LayIndexsidenav.style.width = "250px";
        }
        if (LayIndexsidenav.style.width = "250px") {
            LayIndexsidenav.style.width = "80px";
            LayIndexsidenav.style.fontSize = "1.1rem";
        }
        LayIndexbodymask.classList.remove('add-mask');
    }

    if (document.body.clientWidth < 640) {
        LayIndexbodymask.classList.remove('add-mask');
        if (LayIndexsidenav.style.width != "100%") {
            LayIndexsidenav.style.width = "100%";
        }
        LayIndexsidenav.style.fontSize = "1.25rem";


    }
}


const preloader = document.querySelector(".lay-Index-preloader");

window.addEventListener("load", function () {
    this.window.setTimeout(Index_load, 1000)
});

function Index_load() {
    preloader.classList.add("hide-preloader")
}