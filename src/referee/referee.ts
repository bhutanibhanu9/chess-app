import { PieceType, TeamType, Piece, Position, samePosition } from "../Constants";

export default class Referee {

    tileIsEmptyOrOccupiedByEnemy(position: Position, boardState: Piece[], team: TeamType) {
        return (!this.tileIsOccupied(position, boardState) ||
            this.tileisOccupiedByEnemy(position, boardState, team));
    }

    tileIsOccupied(position: Position, boardState: Piece[]): boolean {

        const piece = boardState.find(p => samePosition(p.position, position));
        if (piece) {
            return true;
        } else {
            return false;
        }
    }

    tileisOccupiedByEnemy(position: Position, boardState: Piece[], team: TeamType): boolean {
        const piece = boardState.find(p => samePosition(p.position, position) && p.team !== team);

        if (piece) {
            return true;
        } else {
            return false;
        }
    }

    isEnPassantMove(
        // SPECIAL EN PASSANT MOVE (IN PASSING)
        initialPosition: Position,
        desiredPosition: Position,
        type: PieceType,
        team: TeamType,
        boardState: Piece[]) {

        const pawnDirection = team === TeamType.OUR ? 1 : -1;

        if (type === PieceType.PAWN) {
            if (
                (desiredPosition.x - initialPosition.x === -1 ||
                    desiredPosition.x - initialPosition.x === 1) &&
                desiredPosition.y - initialPosition.y === pawnDirection
            ) {
                const piece = boardState.find(
                    (p) =>
                        p.position.x === desiredPosition.x &&
                        p.position.y === desiredPosition.y - pawnDirection &&
                        p.enPassant
                );
                if (piece) {
                    return true;
                }
            }
        }
        return false;
    }



    isValidMove(
        initialPosition: Position,
        desiredPosition: Position,
        type: PieceType,
        team: TeamType,
        boardState: Piece[]
    ) {
        if (type === PieceType.PAWN) {
            const specialRow = team === TeamType.OUR ? 1 : 6;
            const pawnDirection = team === TeamType.OUR ? 1 : -1;

            //MOVEMENT LOGIC FOR PAWN
            if (
                initialPosition.x === desiredPosition.x &&
                initialPosition.y === specialRow &&
                desiredPosition.y - initialPosition.y === 2 * pawnDirection
            ) {
                if (
                    !this.tileIsOccupied(
                        desiredPosition,
                        boardState
                    ) &&
                    !this.tileIsOccupied(
                        { x: desiredPosition.x, y: desiredPosition.y - pawnDirection },
                        boardState
                    )
                ) {
                    return true;
                }
            } else if (
                initialPosition.x === desiredPosition.x &&
                desiredPosition.y - initialPosition.y === pawnDirection
            ) {
                if (
                    !this.tileIsOccupied(desiredPosition, boardState)
                ) {
                    return true;
                }
            }
            //ATTACK LOGIC (DIFFRENT THAN MOVEMENT CAUSE OF DIAGONAL ATTACK)
            else if (
                desiredPosition.x - initialPosition.x === -1 &&
                desiredPosition.y - initialPosition.y === pawnDirection
            ) {
                //ATTACK IN UPPER OR BOTTOM LEFT CORNER
                console.log("upper / bottom left");
                if (
                    this.tileisOccupiedByEnemy(
                        desiredPosition,
                        boardState,
                        team
                    )
                ) {
                    return true;
                }
            } else if (
                desiredPosition.x - initialPosition.x === 1 &&
                desiredPosition.y - initialPosition.y === pawnDirection
            ) {
                //ATTACK IN THE UPPER OR BOTTOM RIGHT CORNER
                console.log("upper / bottom right");
                if (
                    this.tileisOccupiedByEnemy(
                        desiredPosition,
                        boardState,
                        team
                    )
                ) {
                    return true;
                }
            }
        } 
        // MOVEMENT FOR KNIGHT

        else if (type = PieceType.KNIGHT) {
            // MOVING LOGIC FOR KNIGHT
            // 8 DIFFRENT MOVING PATTERNS 
            // VERICAL/HORIZONTAL + DIAGONAL


            for (let i = -1; i < 2; i += 2) {
                for (let j = -1; j < 2; j += 2) {
                    // TOP / BOTTOM MOVEMENT
                    if (desiredPosition.y - initialPosition.y === 2 * i) {
                        if (desiredPosition.x - initialPosition.x === j) {
                            if (this.tileIsEmptyOrOccupiedByEnemy(desiredPosition, boardState, team)) {
                                return true;
                            }
                        }
                        // RIGHT/LEFT MOVEMENT
                    } else if (desiredPosition.x - initialPosition.x === 2 * i) {
                        if (desiredPosition.y - initialPosition.y === j) {
                            if (this.tileIsEmptyOrOccupiedByEnemy(desiredPosition, boardState, team)) {
                                return true;
                            }
                        }
                    }
                }
            }
        } return false;
    }
}

