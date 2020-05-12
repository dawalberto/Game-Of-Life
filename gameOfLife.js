document.onload = (() => {

    class Cell {
        /*
        Types 
            eu Edge Up
            er Edge Right
            el Edge Left
            eb Edge Bottom
            clu Corner Left Up
            cru Corner Right Up
            crb Corner Right Bottom
            clb Corner Left Bottom
            m Middle
        */

        constructor(num, type = 'm') {
            this.num = num
            this.type = type
            cellsCreated.push(num)
        }

        alive = false
        life = []
        neighbors = []

    }

    const Game = {
        mode: '', // configure, play, pause, end
        sizeBoard: 0,
        totalCells: 0,
        heightAndWidthCell: 0,
        iterations: 0,
        iterationTime: 0,
        colorAliveCell: '',
        colorDeadCell: '',
        cells: []
    }


    const sliderBoard = document.querySelector('.slider-board')
    const sliderValueSelected = document.querySelector('.slider-board-value-selected')
    const flexSetBoard = document.querySelector('.flex-container-set-board')
    const btnSetBoard = document.querySelector('#button-set-board')
    const flexContainerBoard = document.querySelector('.flex-container-board-and-settings')
    const board = document.querySelector('.grid-container-board')
    const informationBoardSize = document.querySelector('.information-board-size')
    const cellsBoard = document.getElementsByClassName('cell-board')
    const inputColorCellAlive = document.querySelector('.input-color-cell-alive')
    const inputColorCellDead = document.querySelector('.input-color-cell-dead')
    const slideIterationTime = document.querySelector('#slide-iteration-time')
    const slideIterationTimeSelected = document.querySelector('.slide-iteration-time-selected')

    const cellsCreated = []

    // Initial default values
    Game.mode = 'configure'
    Game.iterationTime = slideIterationTime.value
    Game.colorAliveCell = inputColorCellAlive.value
    Game.colorDeadCell = inputColorCellDead.value


    const eventBoardSetted = new Event('boardSetted')
    const eventBoardPrinted = new Event('boardPrinted')

    btnSetBoard.onclick = setBoardClick

    sliderBoard.addEventListener('input', () => {
        sliderValueSelected.innerHTML = `Board  <br> ${sliderBoard.value} x ${sliderBoard.value}`
    })

    window.addEventListener('resize', resizeAlert)

    flexSetBoard.addEventListener('transitionend', boardSetted)

    document.addEventListener('boardSetted', printBoard)

    document.addEventListener('boardPrinted', getCells)

    inputColorCellAlive.addEventListener('change', () => { Game.mode === 'configure' ? Game.colorAliveCell = inputColorCellAlive.value : null })

    inputColorCellDead.addEventListener('change', () => { Game.mode === 'configure' ? Game.colorDeadCell = inputColorCellDead.value : null })

    slideIterationTime.addEventListener('input', () => {
        if (Game.mode === 'configure') {
            Game.iterationTime = slideIterationTime.value
            slideIterationTimeSelected.innerHTML = `⏱ Iteration time: ${Game.iterationTime}ms`
        }
    })



    function setBoardClick() {        
        setBoard()
        flexSetBoard.classList.add('fade-out')
    }

    function boardSetted() {
        this.style.display = 'none'
        document.dispatchEvent(eventBoardSetted)
    }

    function setBoard() {
        Game.sizeBoard = Number(sliderBoard.value)
        Game.totalCells = Game.sizeBoard * Game.sizeBoard

        Game.heightAndWidthCell = Math.round((window.innerHeight - 50) / Game.sizeBoard) < Math.round((window.innerWidth - 50) / Game.sizeBoard) ?
        Math.round((window.innerHeight - 50) / Game.sizeBoard) : Math.round((window.innerWidth - 50) / Game.sizeBoard)

        console.log(`board 👉 ${Game.sizeBoard} x ${Game.sizeBoard}`)
        console.log(`cells 👉 ${Game.heightAndWidthCell}px x ${Game.heightAndWidthCell}px`)
    }

    function printBoard() {
        console.log('printing board...👨🏻‍🎨⏳')

        informationBoardSize.innerHTML = `Board ${sliderBoard.value} x ${sliderBoard.value}`

        const style = document.createElement('style');
        style.innerHTML = `
            .grid-container-board {
                grid-template-columns: repeat(${Game.sizeBoard}, ${Game.heightAndWidthCell}px);
                grid-template-rows: repeat(${Game.sizeBoard}, ${Game.heightAndWidthCell}px);
            }
        `;
        document.head.appendChild(style);

        for(let i = 0; i < Game.totalCells; i++) {
            let cell = document.createElement('span');
            cell.classList.add(`cell-${i + 1}`, 'cell-board', 'cell-dead');
            // cell.textContent = i + 1

            board.appendChild(cell)
        }

        flexContainerBoard.style.display = 'flex'

        changeLifeCellOnClick()

        console.log('done!👨🏻‍🎨')
        document.dispatchEvent(eventBoardPrinted)
    }

    function getCells() {
        console.log('getting type of cells...🦠⏳')

        getCornerCells()
        getEdgeCells()
        getMiddleCells()

        console.log('done! 🦠')
        console.log('getting neighbors of cells...🏘⏳')

        Game.cells.map(cell => getNeighbors(cell))

        console.log('done! 🏘')
        console.log(`cells 👉 ${Game.cells.length}`)
    }

    function getEdgeCells() {
        let edge = Game.sizeBoard

        for (let i = 0; i < Game.sizeBoard; i++) {
            if (i > 1 && i < Game.sizeBoard) {
                Game.cells.push(new Cell(i, 'eu'))
            }

            if (edge > Game.sizeBoard && edge < Game.totalCells) {
                Game.cells.push(new Cell(edge, 'er'))
            }

            if (edge + 1 < Game.totalCells - Game.sizeBoard) {
                Game.cells.push(new Cell(edge + 1, 'el'))
            }
            
            if (Game.totalCells - (i + 1) > Game.totalCells - (Game.sizeBoard - 1)) {
                Game.cells.push(new Cell(Game.totalCells - (i + 1), 'eb'))
            }

            edge += Game.sizeBoard
        }
    }

    function getCornerCells() {
        Game.cells.push(new Cell(1, 'clu'))
        Game.cells.push(new Cell(Game.sizeBoard, 'cru'))
        Game.cells.push(new Cell(Game.totalCells, 'crb'))
        Game.cells.push(new Cell(Game.totalCells - (Game.sizeBoard - 1), 'clb'))
    }

    function getMiddleCells() {
        for (let i = Game.sizeBoard; i < Game.totalCells - Game.sizeBoard; i++) {
            if (!cellsCreated.includes(i)) {
                Game.cells.push(new Cell(i))
            }
        }
    }

    function getNeighbors(cell) {
        switch (cell.type) {
            case 'eu':
                cell.neighbors.push(cell.num - 1)
                cell.neighbors.push(cell.num + 1)
                cell.neighbors.push(cell.num + (Game.sizeBoard - 1))
                cell.neighbors.push(cell.num + Game.sizeBoard)
                cell.neighbors.push(cell.num + (Game.sizeBoard + 1))
                break
            case 'er':
                cell.neighbors.push(cell.num - (Game.sizeBoard + 1))
                cell.neighbors.push(cell.num - Game.sizeBoard)
                cell.neighbors.push(cell.num - 1)
                cell.neighbors.push(cell.num + (Game.sizeBoard - 1))
                cell.neighbors.push(cell.num + Game.sizeBoard)
                break
            case 'el':
                cell.neighbors.push(cell.num - Game.sizeBoard)
                cell.neighbors.push(cell.num - (Game.sizeBoard - 1))
                cell.neighbors.push(cell.num + 1)
                cell.neighbors.push(cell.num + Game.sizeBoard)
                cell.neighbors.push(cell.num + (Game.sizeBoard + 1))
                break
            case 'eb':
                cell.neighbors.push(cell.num - 1)
                cell.neighbors.push(cell.num - (Game.sizeBoard + 1))
                cell.neighbors.push(cell.num - Game.sizeBoard)
                cell.neighbors.push(cell.num - (Game.sizeBoard - 1))
                cell.neighbors.push(cell.num + 1)
                break
            case 'clu':
                cell.neighbors.push(cell.num + 1)
                cell.neighbors.push(Game.sizeBoard + 1)
                cell.neighbors.push(Game.sizeBoard + 2)
                break
            case 'cru':
                cell.neighbors.push(cell.num - 1)
                cell.neighbors.push(Game.sizeBoard + Game.sizeBoard - 1)
                cell.neighbors.push(Game.sizeBoard + Game.sizeBoard)
                break
            case 'crb':
                cell.neighbors.push(cell.num - Game.sizeBoard)
                cell.neighbors.push(cell.num - (Game.sizeBoard + 1))
                cell.neighbors.push(cell.num - 1)
                break
            case 'clb':
                cell.neighbors.push(cell.num - Game.sizeBoard)
                cell.neighbors.push(cell.num - (Game.sizeBoard - 1))
                cell.neighbors.push(cell.num + 1)
                break
            case 'm':
                cell.neighbors.push(cell.num - (Game.sizeBoard + 1))
                cell.neighbors.push(cell.num - Game.sizeBoard)
                cell.neighbors.push(cell.num - (Game.sizeBoard - 1))
                cell.neighbors.push(cell.num - 1)
                cell.neighbors.push(cell.num + 1)
                cell.neighbors.push(cell.num + (Game.sizeBoard - 1))
                cell.neighbors.push(cell.num + Game.sizeBoard)
                cell.neighbors.push(cell.num + (Game.sizeBoard + 1))
                break
        }
    }

    function resizeAlert() {
        // cambiar por un popup
        console.log('Cuidado! el tamaño del tablero se ha calculado en base al tamaño de tu navegador, si cambias de tamaño la ventana asegurate de recargar la página para una correcta visualización ;)')
        console.log(Game)
    }

    function changeLifeCellOnClick() {
        for (let i = 0; i < cellsBoard.length; i++) {
            cellsBoard[i].addEventListener('click', () => {
                if (Game.mode === 'configure') {
                    if (cellsBoard[i].classList.contains('cell-dead')) {
                        cellsBoard[i].classList.replace('cell-dead', 'cell-alive')
                        toggleAliveDeadCell(getNumCellOfClass(cellsBoard[i]))
                    } else {
                        cellsBoard[i].classList.replace('cell-alive', 'cell-dead')
                        toggleAliveDeadCell(getNumCellOfClass(cellsBoard[i]))
                    }
                }
            })
        }
    }

    function getNumCellOfClass(htmlCell) {
        let classNum = htmlCell.classList[0]
        return Number(classNum.substring(classNum.indexOf('l-') + 2, classNum.length))
    }

    function toggleAliveDeadCell(num) {
        Game.cells.map(cell => {
            if (cell.num === num) {
                cell.alive = !cell.alive
                return
            }
        })
    }

    function canCellAlive(cell) {
        for (let i = 0; i < cell.neighbors.length; i++) {
            
        }
    }

})()