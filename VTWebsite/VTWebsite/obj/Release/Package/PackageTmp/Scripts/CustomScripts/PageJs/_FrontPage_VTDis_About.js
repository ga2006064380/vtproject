
const AboutQuestionBtns = document.getElementsByClassName('about-question-btn');
const AboutQuestionI = document.getElementsByClassName('about-content-questionAll-I');
const AboutQuestionDiv = document.getElementsByClassName('about-question-div');
const AboutQuestionDivP = document.getElementsByClassName('about-question-div-p');

function AboutBtns() {
    for (var index = 0; index < AboutQuestionBtns.length; index++) {
        AboutQuestionBtns[index].index = index;
        AboutQuestionBtns[index].addEventListener('click', function () {
            AboutQuestionI[this.index].classList.toggle('active');
            if (AboutQuestionI[this.index].classList.contains('active')) {
                if (document.body.clientWidth > 640) {
                    AboutQuestionDiv[this.index].style.height = '100px';

                } else {
                    AboutQuestionDiv[this.index].style.height = '225px';
                }
                AboutQuestionDivP[this.index].style.opacity = '1';
            } else {
                AboutQuestionDiv[this.index].style.height = '0px';
                AboutQuestionDivP[this.index].style.opacity = '0';
            }

        })
    }
}
AboutBtns();
function none() {
    for (var index = 0; index < AboutQuestionDiv.length; index++) {
        AboutQuestionDiv[index].style.height = '0px';
    }
}




