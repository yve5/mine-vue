import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";

import MinesweeperComponent from "./MineSweeper.vue";

// Mock the useMinesweeper composable
vi.mock("../composables/useMinesweeper", () => ({
  useMinesweeper: vi.fn(() => ({
    tiles: Array(100).fill({
      mine: false,
      revealed: false,
      flagged: false,
      adjacentMines: 0,
    }),
    cols: 10,
    gameOver: false,
    won: false,
    revealTile: vi.fn(),
    toggleFlag: vi.fn(),
    resetGame: vi.fn(),
  })),
}));

describe("MinesweeperComponent", () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    // Create a fresh Pinia instance
    const pinia = createPinia();
    setActivePinia(pinia);

    // Mount the component
    wrapper = mount(MinesweeperComponent, {
      global: {
        plugins: [pinia],
      },
    });
  });

  describe("Rendering", () => {
    it.skip("renders the component title", () => {
      const title = wrapper.find("h1");
      expect(title.text()).toBe("Minesweeper");
    });

    it.skip("renders the restart button", () => {
      const restartButton = wrapper.find("button");
      expect(restartButton.text()).toBe("Restart");
    });

    it.skip("renders the grid with correct number of tiles", () => {
      const tiles = wrapper.findAllComponents({ name: "Tile" });
      expect(tiles.length).toBe(100);
    });

    it.skip("sets grid template columns dynamically", () => {
      const grid = wrapper.find(".grid");
      expect(grid.attributes("style")).toBe("grid-template-columns: repeat(10, 30px);");
    });
  });

  describe("Game State Messages", () => {
    it.skip("does not show game over message by default", () => {
      const gameOverMessage = wrapper.findAll("p").filter((w) => w.text() === "💥 Game Over");
      expect(gameOverMessage.length).toBe(0);
    });

    it.skip("does not show win message by default", () => {
      const winMessage = wrapper.findAll("p").filter((w) => w.text() === "🎉 You Win!");
      expect(winMessage.length).toBe(0);
    });

    it.skip("shows game over message when gameOver is true", async () => {
      // Update the mock to simulate game over
      vi.mocked(MinesweeperComponent.__moduleResolver.useMinesweeper).mockReturnValueOnce({
        ...vi.mocked(MinesweeperComponent.__moduleResolver.useMinesweeper)(),
        gameOver: true,
      });

      // Remount the component
      wrapper = mount(MinesweeperComponent);

      const gameOverMessage = wrapper.findAll("p").filter((w) => w.text() === "💥 Game Over");
      expect(gameOverMessage.length).toBe(1);
    });

    it.skip("shows win message when won is true", async () => {
      // Update the mock to simulate winning
      vi.mocked(MinesweeperComponent.__moduleResolver.useMinesweeper).mockReturnValueOnce({
        ...vi.mocked(MinesweeperComponent.__moduleResolver.useMinesweeper)(),
        won: true,
      });

      // Remount the component
      wrapper = mount(MinesweeperComponent);

      const winMessage = wrapper.findAll("p").filter((w) => w.text() === "🎉 You Win!");
      expect(winMessage.length).toBe(1);
    });
  });
});
