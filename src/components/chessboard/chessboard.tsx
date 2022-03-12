import React, { useRef, useState } from "react";
import Tile from '../tile/tile';
import Referee from "../../referee/referee";
import { 
    HORIZONTAL_AXIS,
    VERTICAL_AXIS,
    Piece,
    PieceType,
    TeamType,
    Position,
    GRID_SIZE,
    samePosition,
    initialBoardState } from "../../Constants";

import './chessboard.css';


export default function Chessboard() {

    const [grabPosition, setGrabPosition] = useState<Position>({ x: -1, y: -1 });
    const[activePiece,setactivePiece]=useState<HTMLElement | null >(null);
    const [pieces , setPieces] = useState<Piece[]>(initialBoardState);
    const chessboardRef = useRef<HTMLDivElement>(null);
    const referee = new Referee();

function grabPiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current;
    const element = e.target as HTMLElement;
    if (element.classList.contains("chess-piece")&& chessboard) {
        const grabX = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
      const grabY = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 640) / GRID_SIZE)
      );
      setGrabPosition({ x: grabX, y: grabY });
        const x = e.clientX - GRID_SIZE/2;
        const y = e.clientY - GRID_SIZE/2;
        element.style.position = "absolute";
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;

        setactivePiece(element);
    }
}
function movePiece(e: React.MouseEvent) {

    const chessboard = chessboardRef.current;
    
    
    if (activePiece && chessboard) {
        const minX = chessboard.offsetLeft - 20;
        const minY = chessboard.offsetTop - 20;
        const maxX = chessboard.offsetLeft + chessboard.clientWidth - 60;
        const maxY = chessboard.offsetTop + chessboard.clientHeight - 65;
        //co nst maxX = chessboard.offset
        const x = e.clientX - GRID_SIZE/2;
        const y = e.clientY - GRID_SIZE/2;
        activePiece.style.position = "absolute";
        if(x < minX){
            activePiece.style.left = `${minX}px`;
        }
        else if(x > maxX){
            activePiece.style.left = `${maxX}px`;
        }
        else{
            activePiece.style.left = `${x}px`;
        }


        if(y < minY){
            activePiece.style.top = `${minY}px`;
        }
        else if(y > maxY){
            activePiece.style.top = `${maxY}px`;
        }
        else{
            activePiece.style.top = `${y}px`;
        } 
        
    }
}
function dropPiece(e : React.MouseEvent){
    const chessboard = chessboardRef.current;
    if(activePiece && chessboard){
        const x = Math.floor((e.clientX - chessboard.offsetLeft)/GRID_SIZE);
        const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop -640)/GRID_SIZE));   
        
        const currentPiece = pieces.find(p => samePosition(p.position, grabPosition));

        if(currentPiece){
            const validMove = referee.isValidMove(grabPosition,{ x, y },currentPiece.type,currentPiece.team,pieces);

            const enPassant = referee.isEnPassantMove(grabPosition,{ x, y },currentPiece.type,currentPiece.team,pieces);

            const pawnDirection = currentPiece.team === TeamType.OUR ? 1 : -1;

            if(enPassant){
                const updatedPieces = pieces.reduce((results,piece) => {
                    if(samePosition(piece.position, grabPosition)){
                    piece.enPassant = false;
                    piece.position.x = x;
                    piece.position.y = y;
                    results.push(piece);
                    }else if(!samePosition(piece.position, { x, y: y - pawnDirection })){ 
                        if(piece.type===PieceType.PAWN){
                            piece.enPassant = false;
                        }
                        results.push(piece);
                    }

                    return results;
                },[] as Piece[])
                setPieces(updatedPieces);
            }else if(validMove){
            const updatedPieces = pieces.reduce((results,piece) => {
                if(samePosition(piece.position, grabPosition)){

                    piece.enPassant =
                Math.abs(grabPosition.y - y) === 2 &&
                piece.type === PieceType.PAWN;

                    piece.position.x = x;
                    piece.position.y = y;
                    results.push(piece);
                }else if(!samePosition(piece.position, { x, y })){ 
                    if(piece.type===PieceType.PAWN){
                        piece.enPassant = false;
                    }
                    results.push(piece);
                }

                return results;
            },[] as Piece[]);
            setPieces(updatedPieces);
        }else{
            activePiece.style.position = 'relative';
            activePiece.style.removeProperty('top');
            activePiece.style.removeProperty('left');
        }
    }
         setactivePiece(null);
    }
}



    let board = [];
    for (let j = VERTICAL_AXIS.length - 1; j >= 0; j--) {
        for (let i = 0; i < HORIZONTAL_AXIS.length; i++) {
            const number = j + i + 2;
            const piece = pieces.find((p) =>
            samePosition(p.position, { x: i, y: j })
          );
          let image = piece ? piece.image : undefined;

            board.push(<Tile key={`${j},${i}`} image={image} number={number} />)
        }
    }
    return( 
    <div
    onMouseUp = {e => dropPiece(e)} 
    onMouseMove={e => movePiece(e)} 
    onMouseDown={e => grabPiece(e)} 
    id='chessboard'
    ref = {chessboardRef}>
         {board}

    </div>
    );
} 