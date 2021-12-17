const LayMutitoggleBtn = document.querySelector(".lay-muti-sidebar-toggle");
const LayMutisidenav = document.querySelector('.lay-muti-sidenav');

const LayMutisidebtn = document.querySelector('.lay-muti-side-search-btn');
const LayMutisidesearch = document.querySelector('.lay-muti-side-search');
const LayMutisideInput = document.querySelector('.lay-muti-side-input');

const LayMutiNavBg = document.querySelector('.lay-muti-nav-bg');
const LayMutiNavUp = document.querySelector('.lay-muti-nav-up');
const LayMutiNavDown = document.querySelector('.lay-muti-nav-down');

const LayMutibodymask = document.querySelector('.lay-muti-mask');




// 當bars被點擊時

LayMutitoggleBtn.addEventListener('click', function () {

    LayMutisidenav.classList.toggle('lay-muti-show-sidebar');

    if (document.body.clientWidth > 640) {
        LayMutibodymask.classList.toggle('add-mask');
    }
})

// 當bars被點擊時

// Mask遮罩

LayMutibodymask.addEventListener('click', function () {
    if (LayMutibodymask.classList.contains('add-mask')) {
        LayMutibodymask.classList.remove('add-mask')
        LayMutisidenav.classList.remove('lay-muti-show-sidebar');
    }
})

// Mask遮罩

// 收起
LayMutiNavUp.addEventListener('click', function () {
    LayMutiNavBg.style.display = 'none';
})
// 收起

//放出
LayMutiNavDown.addEventListener('click', function () {
    LayMutiNavBg.style.display = 'block';
})
//放出

LayMutisidebtn.addEventListener('click', function () {
    LayMutisidesearch.classList.toggle('lay-muti-show-search');
})

window.onresize = function () {
    if (document.body.clientWidth > 640) {
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
    LayMutipreloader.classList.add("hide-preloader");
}