document.onload = (() => {

    const slider = document.querySelector('.slider')
    const sliderValueSelected = document.querySelector('.slider-value-selected')
    const flexSetBoard = document.querySelector('.flex-container-set-board')
    const btnSetBoard = document.querySelector('#button-set-board')


    btnSetBoard.onclick = setBoard

    slider.addEventListener('input', () => {
        sliderValueSelected.innerHTML = `Board  <br> ${slider.value} x ${slider.value}`
    })

    flexSetBoard.addEventListener('transitionend', displayNone)


    function setBoard() {
        flexSetBoard.classList.add('fade-out')
    }

    function displayNone() {
        this.style.display = 'none'
    }

})()