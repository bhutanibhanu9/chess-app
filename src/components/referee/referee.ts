import { PieceType, Teamtype, Piece } from "../chessboard/chessboard";

export default class Referee {

    tileIsOccupied(x: number, y: number, boardState: Piece[]): boolean {
        console.log('tile checking');

        const piece = boardState.find(p => p.x === x && p.y === y);
        if (piece) {
            return true;
        } else {
            return false;
        }
    }

    isValidMove(
        px: number,
        py: number,
        x: number,
        y: number,
        type: PieceType,
        team: Teamtype,
        boardState: Piece[]
    ) {
        console.log(`previous location : (${px} , ${py})`);
        console.log(`current location : (${x} , ${y})`);
        console.log(`Piece type :${type} `);
        console.log(`team :${team}`);

        if (type === PieceType.PAWN) {
            const specialRow = (team === Teamtype.OUR) ? 1 : 6;
            const pawnDirection = (team === Teamtype.OUR) ? 1 : -1;

            if (px === x && py === specialRow && y - py === 2 * pawnDirection) {
                if (!this.tileIsOccupied(x, y, boardState) && !this.tileIsOccupied(x, y - pawnDirection, boardState)) {
                    return true;
                }
            } else if (px === x && y - py === pawnDirection) {
                if (!this.tileIsOccupied(x, y, boardState)) {
                    return true;
                }
            }
        }
        return false;
    }
}