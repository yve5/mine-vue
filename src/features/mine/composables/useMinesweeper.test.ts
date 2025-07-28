import { describe, it, expect, beforeEach } from "vitest";
import { useMinesweeper } from "./useMinesweeper";

describe("useMinesweeper", () => {
  let game: ReturnType<typeof useMinesweeper>;

  beforeEach(() => {
    game = useMinesweeper(5, 5, 5);
  });

  describe("Initial Game Setup", () => {
    it("should create a grid with correct dimensions", () => {
      expect(game.tiles.value.length).toBe(25);
    });

    it("should have correct number of mines", () => {
      const mineCount = game.tiles.value.filter((tile) => tile.mine).length;
      expect(mineCount).toBe(5);
    });

    it("should initialize game state correctly", () => {
      expect(game.gameOver.value).toBe(false);
      expect(game.won.value).toBe(false);
    });
  });

  describe("Tile Revealing", () => {
    it("should reveal a non-mine tile", () => {
      const nonMineTileIndex = game.tiles.value.findIndex((tile) => !tile.mine);
      game.revealTile(nonMineTileIndex);

      expect(game.tiles.value[nonMineTileIndex].revealed).toBe(true);
    });

    it("should end game when revealing a mine", () => {
      const mineTileIndex = game.tiles.value.findIndex((tile) => tile.mine);
      game.revealTile(mineTileIndex);

      expect(game.gameOver.value).toBe(true);
      expect(game.tiles.value[mineTileIndex].revealed).toBe(true);
    });

    it("should recursively reveal adjacent empty tiles", () => {
      // Find a tile with 0 adjacent mines
      const emptyTileIndex = game.tiles.value.findIndex(
        (tile) => tile.adjacentMines === 0 && !tile.mine,
      );

      game.revealTile(emptyTileIndex);

      // Check surrounding tiles are revealed
      const x = emptyTileIndex % game.cols;
      const y = Math.floor(emptyTileIndex / game.cols);

      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          const ni = ny * game.cols + nx;

          if (nx >= 0 && nx < game.cols && ny >= 0 && ny < game.rows) {
            expect(game.tiles.value[ni].revealed).toBe(true);
          }
        }
      }
    });
  });

  describe("Flagging", () => {
    it("should toggle flag on a tile", () => {
      const tileIndex = 0;
      const initialFlagState = game.tiles.value[tileIndex].flagged;

      game.toggleFlag(tileIndex);
      expect(game.tiles.value[tileIndex].flagged).toBe(!initialFlagState);

      game.toggleFlag(tileIndex);
      expect(game.tiles.value[tileIndex].flagged).toBe(initialFlagState);
    });

    it("should not flag a revealed tile", () => {
      const tileIndex = 0;
      game.revealTile(tileIndex);

      game.toggleFlag(tileIndex);
      expect(game.tiles.value[tileIndex].flagged).toBe(false);
    });

    it("should reveal all mines when game is won", () => {
      // Reveal all non-mine tiles
      game.tiles.value.forEach((tile, index) => {
        if (!tile.mine) {
          game.revealTile(index);
        }
      });

      expect(game.won.value).toBe(true);

      // Check that all mine tiles are revealed
      const mineTiles = game.tiles.value.filter((tile) => tile.mine);
      mineTiles.forEach((mineTile) => {
        expect(mineTile.revealed).toBe(true);
      });
    });

    it("should reveal all mines when game is lost", () => {
      const mineTileIndex = game.tiles.value.findIndex((tile) => tile.mine);
      game.revealTile(mineTileIndex);

      expect(game.gameOver.value).toBe(true);

      // Check that all mine tiles are revealed
      const mineTiles = game.tiles.value.filter((tile) => tile.mine);
      mineTiles.forEach((mineTile) => {
        expect(mineTile.revealed).toBe(true);
      });
    });
  });

  describe("Game Reset", () => {
    it("should reset the game to initial state", () => {
      // Modify game state
      const tileIndex = 0;
      game.revealTile(tileIndex);
      game.toggleFlag(tileIndex);

      // Reset the game
      game.resetGame();

      // Check initial state
      expect(game.gameOver.value).toBe(false);
      expect(game.won.value).toBe(false);

      // Check tiles are reset
      game.tiles.value.forEach((tile) => {
        expect(tile.revealed).toBe(false);
        expect(tile.flagged).toBe(false);
      });
    });

    //   it("should regenerate mines on reset", () => {
    //     const initialMines = game.tiles.value.filter((tile) => tile.mine);

    //     game.resetGame();

    //     const newMines = game.tiles.value.filter((tile) => tile.mine);

    //     // While technically possible to have the same mine configuration,
    //     // the probability is extremely low
    //     expect(newMines.length).toBe(5);
    //   });
  });

  describe("Edge Cases", () => {
    it("should not reveal already revealed tiles", () => {
      const tileIndex = 0;
      game.revealTile(tileIndex);

      const initialRevealedState = game.tiles.value[tileIndex].revealed;
      game.revealTile(tileIndex);

      expect(game.tiles.value[tileIndex].revealed).toBe(initialRevealedState);
    });

    it("should not reveal or flag tiles when game is over", () => {
      const mineTileIndex = game.tiles.value.findIndex((tile) => tile.mine);
      game.revealTile(mineTileIndex);

      expect(game.gameOver.value).toBe(true);

      const nonRevealedTileIndex = game.tiles.value.findIndex(
        (tile) => !tile.revealed && !tile.mine,
      );

      // Attempt to reveal and flag after game over
      game.revealTile(nonRevealedTileIndex);
      game.toggleFlag(nonRevealedTileIndex);

      expect(game.tiles.value[nonRevealedTileIndex].revealed).toBe(false);
      expect(game.tiles.value[nonRevealedTileIndex].flagged).toBe(false);
    });

    it("should handle custom grid sizes", () => {
      const customGame = useMinesweeper(8, 8, 10);

      expect(customGame.tiles.value.length).toBe(64); // 8x8 grid
      expect(customGame.tiles.value.filter((tile) => tile.mine).length).toBe(10);
    });
  });
});
