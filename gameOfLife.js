document.onload = (() => {

    const slider = document.querySelector('.slider')
    const sliderValueSelected = document.querySelector('.slider-value-selected')
    const flexSetBoard = document.querySelector('.flex-container-set-board')
    const btnSetBoard = document.querySelector('#button-set-board')
    const flexBoard = document.querySelector('.flex-container-board')

    let sizeBoard
    let fields
    let heightAndWidthField 


    const eventBoardSetted = new Event('boardSetted')

    btnSetBoard.onclick = setBoardClick

    slider.addEventListener('input', () => {
        sliderValueSelected.innerHTML = `Board  <br> ${slider.value} x ${slider.value}`
    })

    flexSetBoard.addEventListener('transitionend', boardSetted)

    document.addEventListener('boardSetted', printBoard)


    function setBoardClick() {        
        setBoard()
        flexSetBoard.classList.add('fade-out')
    }

    function boardSetted() {
        this.style.display = 'none'
        document.dispatchEvent(eventBoardSetted)
    }

    function setBoard() {
        sizeBoard = slider.value
        fields = sizeBoard * sizeBoard

        heightAndWidthField = Math.round(window.outerHeight / sizeBoard) < Math.round(window.outerWidth / sizeBoard) ?
        Math.round(window.outerHeight / sizeBoard) : Math.round(window.outerWidth / sizeBoard)

        console.log(`the width and height of the fields is ${heightAndWidthField}px`)
    }

    function printBoard() {
        console.log('printing board...👨🏻‍🎨⏳')
        flexBoard.style.display = 'flex'
    }

})()