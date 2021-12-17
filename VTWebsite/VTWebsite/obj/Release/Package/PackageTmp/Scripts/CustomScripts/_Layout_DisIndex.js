const LayIndextoggleBtn = document.querySelector(".lay-Index-sidebar-toggle");
const LayIndexsidenav = document.querySelector('.lay-Index-sidenav');

const LayIndexsidebtn = document.querySelector('.lay-Index-side-search-btn');
const LayIndexsidesearch = document.querySelector('.lay-Index-side-search');
const LayIndexsideInput = document.querySelector('.lay-Index-side-input');

const LayIndexsidelink = document.querySelectorAll('.lay-Index-side-link');

const LayIndexbodymask = document.querySelector('.lay-Index-mask');

LayIndextoggleBtn.addEventListener('click', function () {
    LayIndexsidenav.classList.toggle('show-sidebar');

    if (LayIndexsidenav.classList.contains('show-sidenav')) {
        LayIndexsidenav.style.width = "100%";
    }


    if (document.body.clientWidth > 640) {
        LayIndexbodymask.classList.toggle('add-mask');
        if (LayIndexsidenav.style.width === "250px") {
            LayIndexsidenav.style.width = "80px";

            link_none();

        } else {
            LayIndexsidenav.style.width = "250px";
            link_inline();
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
    if (LayIndexsidenav.style.width = "80px") {
        link_none();
    }
})

LayIndexsidebtn.addEventListener('click', function () {
    LayIndexsidesearch.classList.toggle('show-search');
})

window.onresize = function () {
    if (document.body.clientWidth > 640) {
        LayIndexsidesearch.classList.remove('show-search')

        if (LayIndexsidenav.style.width = "250px") {
            LayIndexbodymask.classList.add('add-mask');
            LayIndexsidenav.style.width = "80px";
        }
        if (LayIndexsidenav.style.width === "100%") {
            LayIndexsidenav.style.width = "250px";
        }
        if (LayIndexsidenav.style.width = "80px") {
            link_none();
        }
        LayIndexbodymask.classList.remove('add-mask');
    }

    if (document.body.clientWidth < 640) {
        LayIndexbodymask.classList.remove('add-mask');
        if (LayIndexsidenav.style.width != "100%") {
            LayIndexsidenav.style.width = "100%";
            link_inline()
        }
    }
}


const preloader = document.querySelector(".lay-Index-preloader");

window.addEventListener("load", function () {
    this.window.setTimeout(Index_load, 1000)
});

function Index_load() {
    preloader.classList.add("hide-preloader")
}

function link_none() {
    for (var i = 0; i < LayIndexsidelink.length; i++) {
        LayIndexsidelink[i].style.display = "none";
    }
}

function link_inline() {
    for (var i = 0; i < LayIndexsidelink.length; i++) {
        LayIndexsidelink[i].style.display = "inline-block";
    }
}