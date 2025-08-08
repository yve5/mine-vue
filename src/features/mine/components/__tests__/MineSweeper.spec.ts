import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { ref } from 'vue';

import MineSweeper from '../../index.ts';

const fakeTiles = Array(100).fill({
  adjacentMines: 0,
  revealed: false,
  flagged: false,
  mine: false,
});

vi.mock('../../composables/useMinesweeper', () => ({
  useMinesweeper: vi.fn(() => ({
    tiles: ref(fakeTiles),
    cols: 10,
    rows: 10,
    won: ref(false),
    gameOver: ref(false),
    resetGame: vi.fn(),
    revealTile: vi.fn(),
    toggleFlag: vi.fn(),
  })),
}));

import { useMinesweeper } from '../../composables/useMinesweeper';

const mockedUseMinesweeper = vi.mocked(useMinesweeper);

describe('MineSweeper', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(MineSweeper);
  });

  describe('Rendering', () => {
    it('should render the snapshot correctly', () => {
      expect(wrapper.html()).toMatchSnapshot();
    });

    it('should render the component title', () => {
      const title = wrapper.find('h1');
      expect(title.text()).toBe('Minesweeper');
    });

    it('should render the restart button', () => {
      const restartButton = wrapper.find('button');
      expect(restartButton.text()).toBe('Restart');
    });

    it('should set grid template columns dynamically', () => {
      const grid = wrapper.find('.grid');
      expect(grid.attributes('style')).toBe('grid-template-columns: repeat(10, 30px);');
    });
  });

  describe('Game State Messages', () => {
    it('does not show game over message by default', () => {
      const gameOverMessage = wrapper.findAll('p').filter(({ text }) => text() === '💥 Game Over');
      expect(gameOverMessage.length).toBe(0);
    });

    it('does not show win message by default', () => {
      const winMessage = wrapper.findAll('p').filter(({ text }) => text() === '🎉 You Win!');
      expect(winMessage.length).toBe(0);
    });

    it('shows game over message when gameOver is true', () => {
      mockedUseMinesweeper.mockReturnValueOnce({
        tiles: ref(fakeTiles),
        cols: 10,
        rows: 10,
        gameOver: ref(true),
        won: ref(false),
        revealTile: vi.fn(),
        toggleFlag: vi.fn(),
        resetGame: vi.fn(),
      });

      wrapper = mount(MineSweeper);

      const message = wrapper.findAll('p').filter((item) => item?.text() === '💥 Game Over');

      expect(message.length).toBe(1);
    });

    it('shows victory message when won is true', () => {
      mockedUseMinesweeper.mockReturnValueOnce({
        tiles: ref(fakeTiles),
        cols: 10,
        rows: 10,
        won: ref(true),
        gameOver: ref(false),
        resetGame: vi.fn(),
        revealTile: vi.fn(),
        toggleFlag: vi.fn(),
      });

      wrapper = mount(MineSweeper);

      const message = wrapper.findAll('p').filter((item) => item?.text() === '🎉 You Win!');

      expect(message.length).toBe(1);
    });
  });

  describe('Interactions', () => {
    it('calls resetGame on button click', async () => {
      const resetGameMock = vi.fn();
      mockedUseMinesweeper.mockReturnValueOnce({
        tiles: ref(fakeTiles),
        cols: 10,
        rows: 10,
        gameOver: ref(false),
        won: ref(false),
        revealTile: vi.fn(),
        toggleFlag: vi.fn(),
        resetGame: resetGameMock,
      });

      wrapper = mount(MineSweeper);
      await wrapper.find('button').trigger('click');
      expect(resetGameMock).toHaveBeenCalled();
    });

    it('calls toggleFlag on tile right click', async () => {
      const toggleFlagMock = vi.fn();
      mockedUseMinesweeper.mockReturnValueOnce({
        tiles: ref(fakeTiles),
        cols: 10,
        rows: 10,
        gameOver: ref(false),
        won: ref(false),
        revealTile: vi.fn(),
        toggleFlag: toggleFlagMock,
        resetGame: vi.fn(),
      });

      wrapper = mount(MineSweeper);
      const firstTile = wrapper.find('.tile');
      await firstTile.trigger('contextmenu');
      expect(toggleFlagMock).toHaveBeenCalled();
    });

    it('calls revealTile on tile click', async () => {
      const revealTileMock = vi.fn();
      mockedUseMinesweeper.mockReturnValueOnce({
        tiles: ref(fakeTiles),
        cols: 10,
        rows: 10,
        gameOver: ref(false),
        won: ref(false),
        revealTile: revealTileMock,
        toggleFlag: vi.fn(),
        resetGame: vi.fn(),
      });

      wrapper = mount(MineSweeper);
      const firstTile = wrapper.find('.tile');
      await firstTile.trigger('click');
      expect(revealTileMock).toHaveBeenCalled();
    });
  });
});
