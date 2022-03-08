import { PieceType, Teamtype } from "../chessboard/chessboard";

export default class Referee{
    isValidMove(px : number , py : number , x : number , y : number , type : PieceType , team : Teamtype){
        console.log(`previous location : (${px} , ${py})`);
        console.log(`current location : (${x} , ${y})`);
        console.log(`Piece type :${type} `);
        console.log(`team :${team}`);
        if(type === PieceType.PAWN){
            if(team ===  Teamtype.OPPONENT){
                if(py === 6){
                    if(px ===x && (y - py === -1 || y-py === -2)){
                        console.log("valid move");
                        return true;
                    }
                }else{
                    if(px ===x && y-py === -1 )
                    return true;
                }
            }else{
                if(py === 1){
                    if(px ===x && (y - py === 1 || y-py === 2)){
                        console.log("valid move");
                        return true;
                    }
                }else{
                    if(px ===x && y-py === 1 )
                    return true;
                }
            }
            
            
        }
        return false;
    }
}