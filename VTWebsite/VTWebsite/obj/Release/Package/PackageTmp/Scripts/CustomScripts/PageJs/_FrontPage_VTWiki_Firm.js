const LayWikiFirmBtns = document.querySelectorAll('.wiki-firm-tab-btn');
const LayWikiFirmHead = document.querySelector('.wiki-firm-head');
const LayWikiFirmContent = document.querySelectorAll('.wiki-firm-content');

const LayWikiFirmHL = document.querySelector('.wiki-firm-head-HL');
const LayWikiFirmNJ = document.querySelector('.wiki-firm-head-NJ');

const LayWikiFirmHLbtn = document.querySelector('.wiki-firm-head-HL-btn');
const LayWikiFirmNJbtn = document.querySelector('.wiki-firm-head-NJ-btn');

LayWikiFirmHead.addEventListener('click', function (e) {
    const laywikiFirmId = e.target.dataset.id;
    console.log(laywikiFirmId);
    if (laywikiFirmId) {
        LayWikiFirmBtns.forEach(function (btn) {
            btn.classList.remove('lay-wiki-firm-active');
            e.target.classList.add('lay-wiki-firm-active')
        })

        LayWikiFirmContent.forEach(function (content) {
            content.classList.remove('lay-wiki-firm-active')
        })
        const laywikielement = document.getElementById(laywikiFirmId)
        laywikielement.classList.add('lay-wiki-firm-active');
    }
    if (LayWikiFirmHLbtn.classList.contains('lay-wiki-firm-active')) {
        LayWikiFirmHL.classList.add('wiki-firm-HL-color');
    } else {
        LayWikiFirmHL.classList.remove('wiki-firm-HL-color');
    }

    if (LayWikiFirmNJbtn.classList.contains('lay-wiki-firm-active')) {
        LayWikiFirmNJ.classList.add('wiki-firm-NJ-color');
    } else {
        LayWikiFirmNJ.classList.remove('wiki-firm-NJ-color');
    }

    if (LayWikiFirmNJ.classList.contains('wiki-firm-NJ-color')) {
        LayWikiFirmHead.classList.add('wiki-firm-head_NJ');
    } else {
        LayWikiFirmHead.classList.remove('wiki-firm-head_NJ');
    }
})



