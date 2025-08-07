import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';

import MineSweeper from '../../index.ts';

vi.mock('../composables/useMinesweeper', () => ({
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

describe('MineSweeper', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);

    wrapper = mount(MineSweeper, {
      global: {
        plugins: [pinia],
      },
    });
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
    it.skip('does not show game over message by default', () => {
      const gameOverMessage = wrapper.findAll('p').filter(({ text }) => text() === '💥 Game Over');
      expect(gameOverMessage.length).toBe(0);
    });

    it.skip('does not show win message by default', () => {
      const winMessage = wrapper.findAll('p').filter(({ text }) => text() === '🎉 You Win!');
      expect(winMessage.length).toBe(0);
    });

    it.skip('shows game over message when gameOver is true', async () => {
      // vi.mocked(MineSweeper.__moduleResolver.useMinesweeper).mockReturnValueOnce({
      //   ...vi.mocked(MineSweeper.__moduleResolver.useMinesweeper)(),
      //   gameOver: true,
      // });

      wrapper = mount(MineSweeper);

      const gameOverMessage = wrapper.findAll('p').filter(({ text }) => text() === '💥 Game Over');

      expect(gameOverMessage.length).toBe(1);
    });

    it.skip('shows win message when won is true', async () => {
      // Update the mock to simulate winning
      vi.mocked(MineSweeper.__moduleResolver.useMinesweeper).mockReturnValueOnce({
        ...vi.mocked(MineSweeper.__moduleResolver.useMinesweeper)(),
        won: true,
      });

      // Remount the component
      wrapper = mount(MineSweeper);

      const winMessage = wrapper.findAll('p').filter(({ text }) => text() === '🎉 You Win!');

      expect(winMessage.length).toBe(1);
    });
  });
});
