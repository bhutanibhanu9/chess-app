import React, { useRef } from "react";
import Tile from '../tile/tile';

import './chessboard.css';

const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const verticalAxis = ['1', '2', '3', '4', '5', '6', '7', '8'];

interface Piece {
    image: string
    x: number
    y: number
}

const pieces: Piece[] = [];
for (let i = 0; i < 8; i++) {
    pieces.push({ image: "assets/images/black-pawn.png", x: i, y: 6 })
}

for (let i = 0; i < 8; i++) {
    pieces.push({ image: "assets/images/white-pawn.png", x: i, y: 1 })
}

for (let p = 0; p < 2; p++) {
    const type = p === 0 ? 'black' : 'white';
    const y = p === 0 ? 7 : 0; 

    pieces.push({ image: `assets/images/${type}-rook.png`, x: 0, y: y });
    pieces.push({ image: `assets/images/${type}-rook.png`, x: 7, y: y });
    pieces.push({ image: `assets/images/${type}-knight.png`, x: 1, y: y });
    pieces.push({ image: `assets/images/${type}-knight.png`, x: 6, y: y });
    pieces.push({ image: `assets/images/${type}-bishop.png`, x: 2, y: y });
    pieces.push({ image: `assets/images/${type}-bishop.png`, x: 5, y: y });
    pieces.push({ image: `assets/images/${type}-queen.png`, x: 3, y: y });
    pieces.push({ image: `assets/images/${type}-king.png`, x: 4, y: y });
}


export default function Chessboard() {

    const chessboardRef = useRef<HTMLDivElement>(null);

    let activePiece : HTMLElement | null = null;

function grabPiece(e: React.MouseEvent) {
    const element = e.target as HTMLElement;
    if (element.classList.contains("chess-piece")) {
        const x = e.clientX - 40;
        const y = e.clientY - 40;
        element.style.position = "absolute";
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;

        activePiece = element;
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
    if(activePiece){
        activePiece = null;
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