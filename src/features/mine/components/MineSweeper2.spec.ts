import { describe, it, expect } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
// import { createPinia, setActivePinia } from 'pinia';

import MineSweeper from './MineSweeper.vue';

describe('MineSweeper', () => {
  let wrapper: VueWrapper;

  it('should render the snapshot correctly', async () => {
    wrapper = mount(MineSweeper);

    const tiles = wrapper.findAll('div');

    await tiles[0].trigger('click');

    expect(wrapper.html()).toMatchSnapshot();
  });
});
