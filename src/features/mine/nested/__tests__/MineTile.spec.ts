import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';

import MineTile from '../MineTile.vue';

describe('MineTile', () => {
  const createWrapper = (tileData = {}) => {
    const defaultTile = {
      mine: false,
      revealed: false,
      flagged: false,
      adjacentMines: 0,
      ...tileData,
    };

    return mount(MineTile, {
      props: {
        tile: defaultTile,
      },
    });
  };

  describe('Rendering', () => {
    it('renders default tile state', () => {
      const wrapper = createWrapper();
      expect(wrapper.classes()).toContain('tile');
      expect(wrapper.classes()).not.toContain('revealed');
      expect(wrapper.classes()).not.toContain('flagged');
      expect(wrapper.classes()).not.toContain('mine');
    });

    it('renders revealed tile with adjacent mines', () => {
      const wrapper = createWrapper({
        revealed: true,
        adjacentMines: 3,
      });

      const span = wrapper.find('span');
      expect(span.exists()).toBe(true);
      expect(span.text()).toBe('3');
      expect(wrapper.classes()).toContain('revealed');
    });

    it('renders flagged tile', () => {
      const wrapper = createWrapper({
        flagged: true,
      });

      const flagSpan = wrapper.find('span');
      expect(flagSpan.exists()).toBe(true);
      expect(flagSpan.text()).toBe('🚩');
      expect(wrapper.classes()).toContain('flagged');
    });

    it('renders mine tile', () => {
      const wrapper = createWrapper({
        revealed: true,
        mine: true,
      });

      const mineSpan = wrapper.find('span');
      expect(mineSpan.exists()).toBe(true);
      expect(mineSpan.text()).toBe('💣');
      expect(wrapper.classes()).toContain('mine');
    });
  });

  describe('Events', () => {
    it('emits reveal event on left click', async () => {
      const wrapper = createWrapper();

      await wrapper.trigger('click');

      expect(wrapper.emitted('reveal')).toBeTruthy();
      expect(wrapper.emitted('reveal')?.length).toBe(1);
    });

    it('emits flag event on right click', async () => {
      const wrapper = createWrapper();

      await wrapper.trigger('contextmenu');

      expect(wrapper.emitted('flag')).toBeTruthy();
      expect(wrapper.emitted('flag')?.length).toBe(1);
    });

    it('prevents default context menu on right click', async () => {
      const wrapper = createWrapper();
      const mockPreventDefault = vi.fn();

      await wrapper.trigger('contextmenu', {
        preventDefault: mockPreventDefault,
      });

      expect(mockPreventDefault).toHaveBeenCalled();
    });
  });

  describe('Conditional Rendering', () => {
    it('does not show adjacent mines for unrevealed tiles', () => {
      const wrapper = createWrapper({
        adjacentMines: 3,
      });

      const spans = wrapper.findAll('span');
      expect(spans.length).toBe(0);
    });

    it('does not show flag on revealed tiles', () => {
      const wrapper = createWrapper({
        revealed: true,
        flagged: true,
        mine: true,
      });

      const spans = wrapper.findAll('span');
      expect(spans.length).toBe(1);
    });
  });
});
