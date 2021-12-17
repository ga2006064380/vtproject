
const WikiMembersBtns = document.querySelectorAll('.wiki-members-btn');
const WikiMembersContent = document.querySelector('.wiki-members-content');
const WikiMembersTabContent = document.querySelectorAll('.wiki-members-tab-content');

WikiMembersContent.addEventListener('click', function (e) {
    const id = e.target.dataset.id;
    if (id) {
        WikiMembersBtns.forEach(function (btn) {
            btn.classList.remove('active');
            e.target.classList.add('active')
        });
        WikiMembersTabContent.forEach(function (articles) {
            articles.classList.remove('active')
        })
        const element = document.getElementById(id)
        element.classList.add('active');
    }
});

document.oncontextmenu = new Function("return false");
oncontextmenu = "return false;"