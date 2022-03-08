import React, { useRef, useState } from "react";
import Tile from '../tile/tile';
import Referee from "../referee/referee";

import './chessboard.css';
import { type } from "os";
import { relative } from "node:path/win32";

const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const verticalAxis = ['1', '2', '3', '4', '5', '6', '7', '8'];

interface Piece {
    image: string
    x: number
    y: number
    type : PieceType
    team : Teamtype
}

export enum Teamtype{
    OPPONENT,
    OUR
}

export enum PieceType {
    PAWN,
    BISHOP,
    QUEEN,
    KING,
    KNIGHT,
    ROOK
}

const initialBoardState: Piece[] = [];
for (let i = 0; i < 8; i++) {
    initialBoardState.push({ image: "assets/images/black-pawn.png", x: i, y: 6 ,type: PieceType.PAWN,team : Teamtype.OPPONENT}  )
}

for (let i = 0; i < 8; i++) {
    initialBoardState.push({ image: "assets/images/white-pawn.png", x: i, y: 1 , type: PieceType.PAWN, team : Teamtype.OUR })
}

for (let p = 0; p < 2; p++) {
    const teamtype = (p===0) ? Teamtype.OPPONENT : Teamtype.OUR;
    const type = (teamtype ===Teamtype.OPPONENT) ? 'black' : 'white';  
    const y = (teamtype ===Teamtype.OPPONENT) ? 7 : 0; 

    initialBoardState.push({ image: `assets/images/${type}-rook.png`, x: 0, y: y,type: PieceType.ROOK, team : teamtype });
    initialBoardState.push({ image: `assets/images/${type}-rook.png`, x: 7, y: y,type: PieceType.ROOK ,team : teamtype});
    initialBoardState.push({ image: `assets/images/${type}-knight.png`, x: 1, y: y,type: PieceType.KNIGHT,team : teamtype });
    initialBoardState.push({ image: `assets/images/${type}-knight.png`, x: 6, y: y,type: PieceType.KNIGHT,team : teamtype });
    initialBoardState.push({ image: `assets/images/${type}-bishop.png`, x: 2, y: y,type: PieceType.BISHOP,team : teamtype });
    initialBoardState.push({ image: `assets/images/${type}-bishop.png`, x: 5, y: y,type: PieceType.BISHOP ,team : teamtype});
    initialBoardState.push({ image: `assets/images/${type}-queen.png`, x: 3, y: y,type: PieceType.QUEEN,team : teamtype});
    initialBoardState.push({ image: `assets/images/${type}-king.png`, x: 4, y: y,type: PieceType.KING,team : teamtype });
}


export default function Chessboard() {

    const[gridX,setgridx]=useState(0);
    const[gridY,setgridY]=useState(0);
    const[activePiece,setactivePiece]=useState<HTMLElement | null >(null);
    const [pieces , setPieces] = useState<Piece[]>(initialBoardState);
    const chessboardRef = useRef<HTMLDivElement>(null);
    const referee = new Referee();

function grabPiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current;
    const element = e.target as HTMLElement;
    if (element.classList.contains("chess-piece")&& chessboard) {
        setgridx(Math.floor((e.clientX - chessboard.offsetLeft)/80));
        setgridY(Math.abs(Math.ceil((e.clientY - chessboard.offsetTop -640)/80)));
        const x = e.clientX - 40;
        const y = e.clientY - 40;
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
        const x = e.clientX - 40;
        const y = e.clientY - 40;
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
        const x = Math.floor((e.clientX - chessboard.offsetLeft)/80);
        const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop -640)/80));        

         setPieces((value) => {
             const pieces = value.map(p => {
                 if(p.x == gridX && p.y == gridY){
                 const validMove = referee.isValidMove(gridX,gridY,x,y,p.type,p.team);

                 if(validMove){
                     p.x = x;
                     p.y = y;
                 }else{
                     activePiece.style.position = 'relative';
                     activePiece.style.removeProperty('top');
                     activePiece.style.removeProperty('left');
                 }
                 }
                 return p;
             });
             return pieces;
         });
         setactivePiece(null);
    }
}



    let board = [];
    for (let j = verticalAxis.length - 1; j >= 0; j--) {
        for (let i = 0; i < horizontalAxis.length; i++) {
            const number = i + j;
            let image = undefined;

            pieces.forEach(p => {
                if (p.x === i && p.y === j) {
                    image = p.image;
                }
            })

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