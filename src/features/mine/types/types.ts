export interface Tile {
  mine: boolean;
  revealed: boolean;
  flagged: boolean;
  adjacentMines: number;
}
