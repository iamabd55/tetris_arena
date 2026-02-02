export const ROWS=20;
export const COLS=10;

export function createBoard() {
    return Array.from(
        // Create an array with ROWS number of elements
        {length: ROWS}, () => new Array(COLS).fill(0)
    );
}
