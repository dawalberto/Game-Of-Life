document.onload = (() => {

    const slider = document.querySelector('.slider')
    const sliderValueSelected = document.querySelector('.slider-value-selected')
    const flexSetBoard = document.querySelector('.flex-container-set-board')
    const btnSetBoard = document.querySelector('#button-set-board')
    const flexContainerBoard = document.querySelector('.flex-container-board')
    const board = document.querySelector('.grid-container-board')

    let sizeBoard
    let sizeCells
    let heightAndWidthCell 


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
        sizeCells = sizeBoard * sizeBoard

        heightAndWidthCell = Math.round((window.innerHeight - 50) / sizeBoard) < Math.round((window.innerWidth - 50) / sizeBoard) ?
        Math.round((window.innerHeight - 50) / sizeBoard) : Math.round((window.innerWidth - 50) / sizeBoard)

        console.log(`the width and height of the cells is ${heightAndWidthCell}px`)
    }

    function printBoard() {
        console.log('printing board...👨🏻‍🎨⏳')
        const style = document.createElement('style');
        style.innerHTML = `
            .grid-container-board {
                grid-template-columns: repeat(${sizeBoard}, ${heightAndWidthCell}px);
                grid-template-rows: repeat(${sizeBoard}, ${heightAndWidthCell}px);
            }
        `;
        document.head.appendChild(style);

        for(let i = 0; i < sizeCells; i++) {
            let cell = document.createElement('span');
            cell.classList.add(`cell-${i + 1}`);
            cell.classList.add('cell-board');

            board.appendChild(cell)
        }

        flexContainerBoard.style.display = 'flex'
        console.log('printed!👨🏻‍🎨')
    }

    function getNeighborsCells() {

    }

})()