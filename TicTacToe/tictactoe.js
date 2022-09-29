
var board;
var playerO = "O";
var playerX = "X";
var currPlayer = playerO;
var gameOver = false;

let flag = false;
var cn;
window.onload = function() {
    setGame();
}

function setGame() {
    cn = 0;
    document.getElementById("result").innerText = "Result awaited";
    board = [
                [' ', ' ', ' '],
                [' ', ' ', ' '],
                [' ', ' ', ' ']
            ]
        
            for (let r = 0; r < 3; r++) {
                for (let c = 0; c < 3; c++) {
                    if(flag == false){
                        let tile = document.createElement("div");
                        tile.id = r.toString() + "-" + c.toString();
                        
                        if (r == 0 || r == 1) {
                            tile.classList.add("horizontal-line");
                        }
                        if (c == 0 || c == 1) {
                            tile.classList.add("vertical-line");
                        }
                        tile.innerText = "";
                        tile.classList.add("tile");
                        tile.addEventListener("click", setTile);
                        document.getElementById("board").appendChild(tile);
                    }
                    else{
                        let tile = document.createElement("div");
                        tile.id = r.toString() + "-" + c.toString();
                        const element = document.getElementById(tile.id);
                        element.remove();
                        if (r == 0 || r == 1) {
                            tile.classList.add("horizontal-line");
                        }
                        if (c == 0 || c == 1) {
                            tile.classList.add("vertical-line");
                        }
                        tile.innerText = "";
                        tile.classList.add("tile");
                        tile.addEventListener("click", setTile);
                        document.getElementById("board").appendChild(tile);
                    }
                }
            }
            flag = true;
            currPlayer = playerO;
            document.getElementById("instr").innerText = "Player - "+playerO + " starts the game.";
}

function setTile() {

        let coords = this.id.split("-");    //ex) "1-2" -> ["1", "2'"]
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);
    
        if (board[r][c] != ' ') {
            //already taken spot
            return;
        }
    
        board[r][c] = currPlayer; //mark the board
        this.innerText = currPlayer; //mark the board on html
    
        //change players
        if (currPlayer == playerO) {
            currPlayer = playerX;
        }
        else {
            currPlayer = playerO;
        }
        document.getElementById("instr").innerText = "Player - "+currPlayer + " makes the move.";
        cn++;
        if(cn == 9){
            document.getElementById("instr").innerText = "Reset the game";
        }
        //check winner
        checkWinner();
        if (gameOver) {
            if(cn%2 != 0){
                document.getElementById("result").innerText = "Player O Wins";
            }
            else{
                document.getElementById("result").innerText = "Player X Wins";
            }
            document.getElementById("instr").innerText = "Reset the game";
            currPlayer = playerO;
            gameOver = false;
            cn =0;
        }
}


function checkWinner() {
    //horizontally, check 3 rows
    for (let r = 0; r < 3; r++) {
        if (board[r][0] == board[r][1] && board[r][1] == board[r][2] && board[r][0] != ' ') {
            //if we found the winning row
            //apply the winner style to that row
            for (let i = 0; i < 3; i++) {
                let tile = document.getElementById(r.toString() + "-" + i.toString());
                tile.classList.add("winner");
            }
            gameOver = true;
            return ;
        }
    }

    //vertically, check 3 columns
    for (let c = 0; c < 3; c++) {
        if (board[0][c] == board[1][c] && board[1][c] ==  board[2][c] && board[0][c] != ' ') {
            //if we found the winning col
            //apply the winner style to that col
            for (let i = 0; i < 3; i++) {
                let tile = document.getElementById(i.toString() + "-" + c.toString());
                tile.classList.add("winner");
            }
            gameOver = true;
            return;
        }
    }

    //diagonally
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ' ') {
        for (let i = 0; i < 3; i++) {
            let tile = document.getElementById(i.toString() + "-" + i.toString());
            tile.classList.add("winner");
        }
        gameOver = true;
        return;
    }

    //anti-diagonally
    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != ' ') {
        //0-2
        let tile = document.getElementById("0-2");
        tile.classList.add("winner");

        //1-1
        tile = document.getElementById("1-1");
        tile.classList.add("winner");

        //2-0
        tile = document.getElementById("2-0");
        tile.classList.add("winner");
        gameOver = true;
        return;
    }
}
