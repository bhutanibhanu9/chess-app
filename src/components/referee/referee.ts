import { PieceType, Teamtype, Piece } from "../chessboard/chessboard";

export default class Referee {

    tileIsOccupied(x: number, y: number, boardState: Piece[]): boolean {

        const piece = boardState.find(p => p.x === x && p.y === y);
        if (piece) {
            return true;
        } else {
            return false;
        }
    }

    tileisOccupiedByEnemy(x: number, y: number, boardState: Piece[], team: Teamtype): boolean {
        const piece = boardState.find(p => p.x === x && p.y === y && p.team !== team);

        if (piece) {
            return true;
        } else {
            return false;
        }
    }

    isEnPassantMove(px: number,
        py: number,
        x: number,
        y: number,
        type: PieceType,
        team: Teamtype,
        boardState: Piece[]){

        const pawnDirection = team === Teamtype.OUR ? 1 : -1;

        if(type === PieceType.PAWN){
        if ((x - px === -1 || x-px === 1) && y - py === pawnDirection) {
            const piece = boardState.find(p => p.x === x && p.y === y-pawnDirection && p.enPassant); 
            if(piece){
                return true;
            }
            }
        } 
        return false;
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
        // MOVEMENT LOGIC
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
            // ATTACK LOGIC
            else if (x - px === -1 && y - py === pawnDirection) {
                if (this.tileisOccupiedByEnemy(x, y, boardState, team)) {
                    return true;
                }
                console.log('U&B left corner')
            } else if (x - px === 1 && y - py === pawnDirection) {
                if (this.tileisOccupiedByEnemy(x, y, boardState, team)) {
                    return true;
                }
            }
        }
        return false;
    }
}