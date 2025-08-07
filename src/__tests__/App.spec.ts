import { describe, it, expect, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { mount } from '@vue/test-utils';

import App from '../App.vue';
import Mine from '@/features/mine';
import Hello from '@/features/hello';

describe('App', () => {
  let wrapper: ReturnType<typeof mount>;

  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);

    wrapper = mount(App, {
      global: {
        plugins: [pinia],
      },
    });
  });

  it('renders both child components', () => {
    const mineComponent = wrapper.findComponent(Mine);
    expect(mineComponent.exists()).toBe(true);

    const helloComponent = wrapper.findComponent(Hello);
    expect(helloComponent.exists()).toBe(true);
  });
});
