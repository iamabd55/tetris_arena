import { tetrominos } from "./tetrominos";

export const spawnPiece = () => {
    const keys=Object.keys(tetrominos);
    const randomKey=keys[Math.floor(Math.random()*keys.length)];

    return{
        shape:tetrominos[randomKey],
        x:3,
        y:0
    };
};