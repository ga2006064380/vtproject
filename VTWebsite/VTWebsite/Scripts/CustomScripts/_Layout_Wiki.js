const LayWikipreloader = document.querySelector(".lay-wiki-preloader");

const LayWikisidebarbtn = document.querySelector(".lay-wiki-sidebar-toggle");
const LayWikisidenav = document.querySelector(".lay-wiki-sidenav");

LayWikisidebarbtn.addEventListener('click', function () {
    LayWikisidenav.classList.toggle('lay-wiki-show-sidebar');
    
})

window.addEventListener("load", function () {
    this.window.setTimeout(Wiki_load, 1000)
});

function Wiki_load() {
    LayWikipreloader.classList.add("wiki-hide-preloader");
}

