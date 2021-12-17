const LayMutitoggleBtn = document.querySelector(".lay-muti-sidebar-toggle");
const LayMutisidenav = document.querySelector('.lay-muti-sidenav');

const LayMutisidebtn = document.querySelector('.lay-muti-side-search-btn');
const LayMutisidesearch = document.querySelector('.lay-muti-side-search');
const LayMutisideInput = document.querySelector('.lay-muti-side-input');

const LayMutibodymask = document.querySelector('.lay-muti-mask');

LayMutitoggleBtn.addEventListener('click', function () {
    // if (sidenav.classList.contains('show-sidenav')) {
    //     sidenav.classList.remove('show-sidenav')
    // } else {
    //     sidenav.classList.add('show-sidenavr')
    // }
    LayMutisidenav.classList.toggle('lay-muti-show-sidebar');

    if (document.body.clientWidth > 640) {
        LayMutibodymask.classList.toggle('add-mask');
    }
})

LayMutibodymask.addEventListener('click', function () {
    if (LayMutibodymask.classList.contains('add-mask')) {
        LayMutibodymask.classList.remove('add-mask')
        LayMutisidenav.classList.remove('lay-muti-show-sidebar');
    }
})

LayMutisidebtn.addEventListener('click', function () {
    LayMutisidesearch.classList.toggle('lay-muti-show-search');
})

window.onresize = function () {
    if(document.body.clientWidth > 640) {
        LayMutisidesearch.classList.remove('lay-muti-show-search')
        if (LayMutisidenav.classList.contains('lay-muti-show-sidebar')) {
            LayMutibodymask.classList.add('add-mask');
        }
    }

    if (document.body.clientWidth < 640) {
        LayMutibodymask.classList.remove('add-mask');
    }
}


const LayMutipreloader = document.querySelector(".lay-muti-preloader");

window.addEventListener("load", function () {
    this.window.setTimeout(LayMuti_load, 1000)
});

function LayMuti_load() {
    LayMutipreloader.classList.add("hide-preloader")
}