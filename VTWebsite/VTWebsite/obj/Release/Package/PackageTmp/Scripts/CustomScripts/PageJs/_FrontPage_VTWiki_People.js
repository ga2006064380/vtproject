const LayWikiPeopleBtns = document.querySelectorAll('.wiki-people-tab-btn');
const LayWikiPeoplehead = document.querySelector('.lay-wiki-people-head');
const LayWikiPeopleContent = document.querySelectorAll('.lay-wiki-people-content');

const LayWikiPeopleHLbtn = document.querySelector('.lay-wiki-people-head-HL');
const LayWikiPeopleNJbtn = document.querySelector('.lay-wiki-people-head-NJ');

const LayWikiPeopleHLmembers = document.querySelector('.lay-wiki-people-HL-members');
const LayWikiPeopleNJmembers = document.querySelector('.lay-wiki-people-NJ-members');
const LayWikiPeoplemain = document.querySelector('.lay-wiki-bg-main');

const LayWikiflexBF = document.createElement('style');


//const LayWikiflexBF = document.createElement('style');
//style.innerHTML = ".lay-wiki-people-head-flex::before{background:green}";
//document.head.appendChild(style);

//LayWikiFirmHead.addEventListener('click', function (e) {
//    const laywikiId = e.target.dataset.id;
//    console.log(laywikiId);
//    if (laywikiId) {
//        LayWikiFirmBtns.forEach(function (btn) {
//            btn.classList.remove('lay-wiki-firm-active');
//            e.target.classList.add('lay-wiki-firm-active')
//        })

//        LayWikiFirmContent.forEach(function (content) {
//            content.classList.remove('lay-wiki-firm-active')
//        })
//        const laywikielement = document.getElementById(laywikiId)
//        laywikielement.classList.add('lay-wiki-firm-active');
//    }
//})

LayWikiPeoplehead.addEventListener('click', function (e) {
    const laywikiPeopleId = e.target.dataset.id;
    if (laywikiPeopleId) {
        LayWikiPeopleBtns.forEach(function (btn) {
            btn.classList.remove('lay-wiki-people-active')
            e.target.classList.add('lay-wiki-people-active')
        })

        LayWikiPeopleContent.forEach(function (peoplecontent) {
            peoplecontent.classList.remove('lay-wiki-people-active')
        })
        const laypeoplement = document.getElementById(laywikiPeopleId)
        laypeoplement.classList.add('lay-wiki-people-active');
    }



    if (LayWikiPeopleHLbtn.classList.contains('lay-wiki-people-active')) {
        LayWikiPeopleHLbtn.style.color = 'white';
        LayWikiflexBF.innerHTML = ".lay-wiki-people-head-flex::before{left:0%)}";
        document.head.appendChild(LayWikiflexBF);
        LayWikiPeopleHLmembers.style.color = 'black';
        LayWikiPeopleHLmembers.style.display = 'block';
        LayWikiPeopleNJbtn.style.color = 'black';
        LayWikiPeoplemain.style.backgroundColor = '#D1E8E4';
    }

    if (LayWikiPeopleNJbtn.classList.contains('lay-wiki-people-active')) {
        LayWikiPeopleNJbtn.style.color = 'white';
        LayWikiflexBF.innerHTML = ".lay-wiki-people-head-flex::before{left:50%}";
        document.head.appendChild(LayWikiflexBF);
        LayWikiPeopleNJmembers.style.display = 'block';
        LayWikiPeopleHLbtn.style.color = 'black';
        LayWikiPeopleHLmembers.style.display = 'none';
        LayWikiPeoplemain.style.backgroundColor = '#F6EABE';
    } else {
        LayWikiPeopleNJbtn.style.color = 'black';
        LayWikiPeopleNJmembers.style.display = 'none';
    }

    
})