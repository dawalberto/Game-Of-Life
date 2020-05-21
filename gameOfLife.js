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

        life = [false]
        neighbors = []

    }

    const Game = {
        mode: '', // configure, play, pause, end
        sizeBoard: 0,
        totalCells: 0,
        heightAndWidthCell: 0,
        iterationsNum: 0,
        iterationTime: 0,
        iterations: '',
        colorAliveCell: '',
        colorDeadCell: '',
        cells: []
    }


    // Elements
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
    const btnPlayPauseGame = document.querySelector('#button-play-pause-game')
    const iterationsCount = document.querySelector('.iterations-count')
    const gameMode = document.querySelector('.game-mode')
    const btnPreviusIteration = document.querySelector('#buton-previus-iteration')
    const btnResetGame = document.querySelector('#button-reset-game')

    const cellsCreated = []

    // Initial default values
    Game.mode = 'configure'
    Game.iterationTime = Number(slideIterationTime.value)
    Game.colorAliveCell = inputColorCellAlive.value
    Game.colorDeadCell = inputColorCellDead.value


    // Events
    const eventBoardSetted = new Event('boardSetted')
    const eventBoardPrinted = new Event('boardPrinted')
    const eventPlayGame = new Event('playGame')
    const eventPauseGame = new Event('pauseGame')

    btnSetBoard.addEventListener('click', setBoard)

    btnPreviusIteration.addEventListener('click', previusIteration)

    btnResetGame.addEventListener('click', resetGame)

    sliderBoard.addEventListener('input', () => {
        sliderValueSelected.innerHTML = `Board  <br> <span style="font-weight: 900;">${sliderBoard.value}</span> x <span style="font-weight: 900;">${sliderBoard.value}</span>`
    })

    window.addEventListener('resize', resizeAlert)

    flexSetBoard.addEventListener('transitionend', boardSetted)

    document.addEventListener('boardSetted', printBoard)

    document.addEventListener('boardPrinted', getCells)

    inputColorCellAlive.addEventListener('change', () => { Game.mode === 'pause' || Game.mode === 'configure' ? (Game.colorAliveCell = inputColorCellAlive.value, printIteration()) : null })

    inputColorCellDead.addEventListener('change', () => { Game.mode === 'pause' || Game.mode === 'configure' ? (Game.colorDeadCell = inputColorCellDead.value, printIteration()) : null })

    slideIterationTime.addEventListener('input', () => {
        if (Game.mode === 'pause' || Game.mode === 'configure') {
            Game.iterationTime = Number(slideIterationTime.value)
            slideIterationTimeSelected.innerHTML = `⏱ Iteration time: <span class="information-game">${Game.iterationTime}ms</span>`
        }
    })

    btnPlayPauseGame.addEventListener('click', playPauseGame)

    document.addEventListener('playGame', playGame)

    document.addEventListener('pauseGame', pauseGame)


    // Functions
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

        flexSetBoard.classList.add('fade-out')
    }

    function printBoard() {
        console.log('printing board...👨🏻‍🎨⏳')

        informationBoardSize.innerHTML = `Board: <span class="information-game">${sliderBoard.value} x ${sliderBoard.value}</span>`

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
                    if (!isCellAlive(cellsBoard[i])) {
                        cellsBoard[i].style.backgroundColor = Game.colorAliveCell
                    } else {
                        cellsBoard[i].style.backgroundColor = Game.colorDeadCell
                    }
                    toggleAliveDeadCell(getNumCellByHtmlClass(cellsBoard[i]))
                }
            })

        }
    }

    function getNumCellByHtmlClass(htmlCell) {
        let classNum = htmlCell.classList[0]
        return Number(classNum.substring(classNum.indexOf('l-') + 2, classNum.length))
    }

    function toggleAliveDeadCell(num) {
        Game.cells.map(cell => {
            if (cell.num === num) {
                cell.life[Game.iterationsNum] = !cell.life[Game.iterationsNum]
                return
            }
        })
    }

    function isCellAlive(htmlCell) {
        let cell = getCellByNum(getNumCellByHtmlClass(htmlCell))
        return cell.life[Game.iterationsNum]
    }

    function getCellByNum(num) {
        return Game.cells.filter(cell => cell.num === num)[0]
    }

    function canCellAliveNextIteration(cell) {
        let aliveNeighbors = cell.neighbors.filter(neighbor => getCellByNum(neighbor).life[Game.iterationsNum]).length

        if (aliveNeighbors === 2 || aliveNeighbors === 3) {
            if (cell.life[Game.iterationsNum]) {
                return true
            } else if (aliveNeighbors === 3) {
                return true
            }            
        }

        return false

    }

    function playPauseGame() {
        if (Game.mode === 'play') {
            document.dispatchEvent(eventPauseGame)
        } else {
            document.dispatchEvent(eventPlayGame)
        }

        playPauseRulesAndActions()
    }

    function playGame() {
        Game.mode = 'play'
        
        Game.iterations = setInterval(nextIteration, Game.iterationTime) 
        console.log('play')
    }

    function pauseGame() {
        Game.mode = 'pause'
        
        clearInterval(Game.iterations)
        console.log('pause')
    }

    function nextIteration() {
        Game.cells.map(cell => {
            if (canCellAliveNextIteration(cell)) {
                cell.life.push(true)
            } else {
                cell.life.push(false)
            }
        })

        printIteration()
        console.log('nextIteration')

        Game.iterationsNum += 1
        iterationsCount.innerHTML = `Iterations: <span class="information-game">${Game.iterationsNum}</span>`

        if (isGameEnd()) {
            endGame()
        }
    }

    function printIteration() {
        for (let i = 0; i < cellsBoard.length; i++) {

            if (isCellAlive(cellsBoard[i])) {
                cellsBoard[i].style.backgroundColor = Game.colorAliveCell
            } else {
                cellsBoard[i].style.backgroundColor = Game.colorDeadCell
            }

        }
    }

    function previusIteration() {
        if (Game.mode === 'pause' && Game.iterationsNum > 0) {
            Game.iterationsNum -= 1
            Game.cells.map(cell => cell.life.pop())
            iterationsCount.innerHTML = `Iterations: <span class="information-game">${Game.iterationsNum}</span>`
            printIteration()
        }
    }

    function playPauseRulesAndActions() {
        gameMode.innerHTML = `Game mode: <span class="information-game">${Game.mode.toUpperCase()}</span>`

        if (Game.mode === 'play') {
            slideIterationTime.setAttribute('disabled', true)
            slideIterationTime.setAttribute('title', '⚠️ Iteration tame only can change in pause mode')

            inputColorCellAlive.setAttribute('disabled', true)
            inputColorCellAlive.setAttribute('title', '⚠️ Alive cell color only can change in pause mode')
            inputColorCellDead.setAttribute('disabled', true)
            inputColorCellDead.setAttribute('title', '⚠️ Dead cell color only can change in pause mode')

            btnResetGame.setAttribute('disabled', true)
            btnResetGame.setAttribute('title', '⚠️ Reset game only can do on pause mode')

            btnPreviusIteration.setAttribute('disabled', true)
            btnPreviusIteration.setAttribute('title', '⚠️ Previus iteration only can do on pause mode')
        } else {
            slideIterationTime.removeAttribute('disabled')
            slideIterationTime.removeAttribute('title')

            inputColorCellAlive.removeAttribute('disabled')
            inputColorCellAlive.removeAttribute('title')
            inputColorCellDead.removeAttribute('disabled')
            inputColorCellDead.removeAttribute('title')

            btnResetGame.removeAttribute('disabled')
            btnResetGame.removeAttribute('title')

            btnPreviusIteration.removeAttribute('disabled')
            btnPreviusIteration.removeAttribute('title')
        }
    }

    function resetGame() {
        if (Game.mode === 'pause' || Game.mode === 'configure' || Game.mode === 'end') {
            Game.mode = 'configure'
            Game.iterationTime = 500
            Game.colorAliveCell = '#FFFFFF'
            Game.colorDeadCell = '#000000'
            Game.iterationsNum =  0
            Game.iterations =  ''
            Game.cells = []

            cellsCreated.length = 0

            inputColorCellAlive.value = Game.colorAliveCell
            inputColorCellDead.value = Game.colorDeadCell
            slideIterationTime.value = Game.iterationTime

            iterationsCount.innerHTML = `Iterations: <span class="information-game">${Game.iterationsNum}</span>`
            gameMode.innerHTML = `Game mode: <span class="information-game">${Game.mode.toUpperCase()}</span>`
            slideIterationTimeSelected.innerHTML = `⏱ Iteration time: <span class="information-game">${Game.iterationTime}ms</span>`

            getCells()
            printIteration()            
        }
    }

    function isGameEnd() {
        return Game.cells.every(cell => cell.life[Game.iterationsNum] === cell.life[Game.iterationsNum - 1])
    }

    function endGame() {        
        clearInterval(Game.iterations)
        Game.mode = 'end'
        gameMode.innerHTML = `Game mode: <span class="information-game">${Game.mode.toUpperCase()}</span>`
        
        btnResetGame.removeAttribute('disabled')
        btnResetGame.removeAttribute('title')
        btnPreviusIteration.removeAttribute('disabled')
        btnPreviusIteration.removeAttribute('title')
        
        console.log('End Game')
    }

})()