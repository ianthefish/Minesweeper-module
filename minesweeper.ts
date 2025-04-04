// define the type of cell of board
type Cell = {
    is_mine: boolean;
    neighbor: number;
    is_open: boolean;
};

// define the type of position
type Position = {
    row: number;
    col: number;
};

export class MinesweeperBoard{
    board: Cell[][];
    mine_pos: Position[];
    width: number;
    height: number;
    mine_count: number;

    constructor(width: number, height: number, mine_count: number){
        // check the validation of input
        if(width <= 0 || height <= 0){
            throw new Error('width and height must be positive');
        }

        if(mine_count <= 0){
            throw new Error('the number of mines must be positive');
        }

        if(width*height <= mine_count){
            throw new Error('the number of mines must less than the number of cells');
        }

        this.width = width;
        this.height = height;
        this.mine_pos = [];
        this.mine_count = mine_count;
        this.board = [];

        // initialize the board
        for(let i = 0;i < this.height;i++){
            this.board[i] = [];
            for(let j = 0;j < this.width;j++){
                this.board[i][j] = {
                    is_mine: false,
                    neighbor: 0,
                    is_open: false
                }
            }
        }
    }

    public place_mine(first_placed: Position): Position[] {
        // check the validation of input
        if(this.mine_pos.length != 0){
            throw new Error("mines have already been placed");
        }

        if(first_placed.col < 0 || first_placed.col >= this.height || first_placed.row < 0 || first_placed.row >= this.width){
            throw new Error("first place must be inside the board");
        }
        
        const other_position: Position[] = [];
        // get the valid position
        for(let i = 0;i < this.width;i++){
            for(let j = 0;j < this.height;j++){
                if (i == first_placed.row && j == first_placed.col){
                    continue;
                } 
                other_position.push({ row: i, col: j });
            }
        }
        // place mine using Fisher Yates algorithm
        for (let i = other_position.length-1;i > 0;i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [other_position[i], other_position[j]] = [other_position[j], other_position[i]];
        }

        for (let i = 0;i < this.mine_count;i++) {
            this.mine_pos.push(other_position[i]);
            this.board[other_position[i].row][other_position[i].col].is_mine = true;
            this.update_neighbor(other_position[i]);
        }

        return this.mine_pos;
    }
    // update the number of mines in neighbor
    private update_neighbor(mine: Position){
        for(let i = Math.max(0,mine.row-1);i < Math.min(this.width,mine.row+2);i++){
            for(let j = Math.max(0,mine.col-1);j < Math.min(this.height,mine.col+2);j++){
                if(i != mine.row || j != mine.col){
                    this.board[i][j].neighbor++;
                }
            }
        }
    }
}