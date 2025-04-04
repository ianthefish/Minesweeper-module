import { MinesweeperBoard } from './minesweeper';

const game = new MinesweeperBoard(10,10,15);

const first_click = { row: 3, col: 4 };

const minePositions = game.place_mine(first_click);

minePositions.forEach(pos => {
    console.log(`mine at (${pos.row}, ${pos.col})`);
});

console.log('\n')

const board = game.board;

for (let row = 0;row < board.length;row++) {
let each_row = "";
for (let col = 0;col < board[row].length;col++) {
    const cell = board[row][col];

    if (cell.is_mine) {
        each_row += "X ";
    } else {
        each_row += (cell.neighbor > 0 ? cell.neighbor : "·") + " ";
    }
}
console.log(each_row);
}
