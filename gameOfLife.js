document.onload = (() => {

    class Cell {

        constructor(num, type = 'm') {
            this.num = num
            this.type = type
        }

        alive = false
        neighbors = []

    }

    const slider = document.querySelector('.slider')
    const sliderValueSelected = document.querySelector('.slider-value-selected')
    const flexSetBoard = document.querySelector('.flex-container-set-board')
    const btnSetBoard = document.querySelector('#button-set-board')
    const flexContainerBoard = document.querySelector('.flex-container-board')
    const board = document.querySelector('.grid-container-board')

    let sizeBoard
    let sizeCells
    let heightAndWidthCell 

    const cells = []


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
        sizeBoard = Number(slider.value)
        sizeCells = sizeBoard * sizeBoard

        heightAndWidthCell = Math.round((window.innerHeight - 50) / sizeBoard) < Math.round((window.innerWidth - 50) / sizeBoard) ?
        Math.round((window.innerHeight - 50) / sizeBoard) : Math.round((window.innerWidth - 50) / sizeBoard)

        console.log(`board 👉 ${sizeBoard} x ${sizeBoard}`)
        console.log(`cells 👉 ${heightAndWidthCell}px x ${heightAndWidthCell}px`)
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
            cell.textContent = i + 1

            board.appendChild(cell)
        }

        flexContainerBoard.style.display = 'flex'
        console.log('printed!👨🏻‍🎨')

        console.log('getting type of cells...⚙️⏳')
        getCornersCells()
        getEdgesCells()
        console.log('done! ⚙️')
        cells.forEach(cell => {
            console.log(cell)
        })
    }

    function getEdgesCells() {
        let edge = sizeBoard

        for (let i = 0; i < sizeBoard; i++) {
            if (i > 1 && i < sizeBoard) {
                let cell = new Cell(i, 'eu')
                cells.push(cell)
            }

            if (edge > sizeBoard && edge < sizeCells) {
                let cell = new Cell(edge, 'er')
                cells.push(cell)
            }

            if (edge + 1 < sizeCells - sizeBoard) {
                let cell = new Cell(edge + 1, 'el')
                cells.push(cell)
            }
            
            if (sizeCells - (i + 1) > sizeCells - (sizeBoard - 1)) {
                let cell = new Cell(sizeCells - (i + 1), 'eb')
                cells.push(cell)
            }

            edge += sizeBoard
        }
    }

    function getCornersCells() {
        let cell = new Cell(1, 'clu')
        cells.push(cell)

        cell = new Cell(sizeBoard, 'cru')
        cells.push(cell)

        cell = new Cell(sizeCells, 'crb')
        cells.push(cell)

        cell = new Cell(sizeCells - (sizeBoard - 1), 'clb')
        cells.push(cell)
    }


})()