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

    //MOVEMENT LOGIC FOR PAWN
    pawnMove(initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Piece[]): boolean {
        const specialRow = team === TeamType.OUR ? 1 : 6;
        const pawnDirection = team === TeamType.OUR ? 1 : -1;

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
        return false;
    }


    // MOVEMENT FOR KNIGHT
    knightMove(initialPosition: Position,
        desiredPosition: Position,
        team: TeamType,
        boardState: Piece[]): boolean {
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
        } return false;
    }


    // MOVEMENT AND ATTACK LOGIC FOR BISHOP
    bishopMove(initialPosition: Position,
        desiredPosition: Position,
        team: TeamType,
        boardState: Piece[]): boolean {
        for (let i = 1; i < 8; i++) {
            // TOP RIGHT MOVEMENT
            if (desiredPosition.x > initialPosition.x && desiredPosition.y > initialPosition.y) {
                let passedPosition: Position = { x: initialPosition.x + i, y: initialPosition.y + i };
                if (samePosition(passedPosition, desiredPosition)) {
                    if (this.tileIsEmptyOrOccupiedByEnemy(passedPosition, boardState, team)) {
                        return true;
                    }
                }
                else {
                    if (this.tileIsOccupied(passedPosition, boardState)) {
                        break;
                    }
                }
            }



            // BOTTOM RIGHT MOVEMENT
            if (desiredPosition.x > initialPosition.x && desiredPosition.y < initialPosition.y) {
                let passedPosition: Position = { x: initialPosition.x + i, y: initialPosition.y - i };
                if (samePosition(passedPosition, desiredPosition)) {
                    if (this.tileIsEmptyOrOccupiedByEnemy(passedPosition, boardState, team)) {
                        return true;
                    }
                }
                else {
                    if (this.tileIsOccupied(passedPosition, boardState)) {
                        break;
                    }
                }
            }
            // BOTTOM LEFT MOVEMENT
            if (desiredPosition.x < initialPosition.x && desiredPosition.y < initialPosition.y) {
                let passedPosition: Position = { x: initialPosition.x - i, y: initialPosition.y - i };
                if (samePosition(passedPosition, desiredPosition)) {
                    if (this.tileIsEmptyOrOccupiedByEnemy(passedPosition, boardState, team)) {
                        return true;
                    }
                }
                else {
                    if (this.tileIsOccupied(passedPosition, boardState)) {
                        break;
                    }
                }
            }
            // TOP LEFT
            if (desiredPosition.x < initialPosition.x && desiredPosition.y > initialPosition.y) {
                let passedPosition: Position = { x: initialPosition.x - i, y: initialPosition.y + i };
                if (samePosition(passedPosition, desiredPosition)) {
                    if (this.tileIsEmptyOrOccupiedByEnemy(passedPosition, boardState, team)) {
                        return true;
                    }
                }
                else {
                    if (this.tileIsOccupied(passedPosition, boardState)) {
                        break;
                    }
                }
            }

        } return false;
    }

    // MOVEMENT LOGIC FOR ROOK

    rookMove(initialPosition: Position,
        desiredPosition: Position,
        team: TeamType,
        boardState: Piece[]): boolean {

        //  VERTICAL MOVEMENT    

        if (initialPosition.x === desiredPosition.x) {
            for (let i = 1; i < 8; i++) {
                let vertical = desiredPosition.y < initialPosition.y ? 1 : -1;
                let passedPosition: Position = { x: initialPosition.x, y: initialPosition.y - (i * vertical) };
                if (samePosition(passedPosition, desiredPosition)) {
                    if (this.tileIsEmptyOrOccupiedByEnemy(passedPosition, boardState, team))
                        return true;
                } else {
                    if (this.tileIsOccupied(passedPosition, boardState))
                        break;
                }
            }
        }

        // HORIZONTAL MOVEMENT

        if (initialPosition.y === desiredPosition.y) {
            for (let i = 1; i < 8; i++) {
                let horizontal = desiredPosition.x < initialPosition.x ? 1 : -1;
                let passedPosition: Position = { x: initialPosition.x - (i * horizontal), y: initialPosition.y };
                if (samePosition(passedPosition, desiredPosition)) {
                    if (this.tileIsEmptyOrOccupiedByEnemy(passedPosition, boardState, team))
                        return true;
                } else {
                    if (this.tileIsOccupied(passedPosition, boardState))
                        break;
                }
            }
        } return false;
    }




    isValidMove(
        initialPosition: Position,
        desiredPosition: Position,
        type: PieceType,
        team: TeamType,
        boardState: Piece[]
    ) {
        let validMove = false;
        switch (type) {
            case PieceType.PAWN:
                validMove = this.pawnMove(initialPosition, desiredPosition, team, boardState)
                break;

            case PieceType.KNIGHT:
                validMove = this.knightMove(initialPosition, desiredPosition, team, boardState)
                break;

            case PieceType.BISHOP:
                validMove = this.bishopMove(initialPosition, desiredPosition, team, boardState)
                break;

            case PieceType.ROOK:
                validMove = this.rookMove(initialPosition, desiredPosition, team, boardState)
        }
        return validMove;
    }
}

