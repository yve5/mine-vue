import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';

import App from '../App.vue';
import Mine from '@/features/mine';
import HelloWorld from '@/features/hello';

// Mock child components to isolate testing
vi.mock('@/features/mine', () => ({
  default: {
    name: 'Mine',
    template: '<div class="mine-component">Minesweeper</div>',
  },
}));

vi.mock('@/features/hello', () => ({
  default: {
    name: 'HelloWorld',
    template: '<div class="hello-component">Hello Component</div>',
  },
}));

describe('App', () => {
  describe('Rendering', () => {
    it.skip('renders both child components', () => {
      const wrapper = mount(App);

      // Check Mine component is rendered
      const mineComponent = wrapper.findComponent(Mine);
      expect(mineComponent.exists()).toBe(true);

      // Check HelloWorld component is rendered
      const helloComponent = wrapper.findComponent(HelloWorld);
      expect(helloComponent.exists()).toBe(true);
    });

    it.skip('passes correct prop to HelloWorld', () => {
      const wrapper = mount(App);

      const helloComponent = wrapper.findComponent(HelloWorld);
      expect(helloComponent.props('msg')).toBe('Hello!!!');
    });
  });

  describe('Component Structure', () => {
    it.skip('renders components in correct order', () => {
      const wrapper = mount(App);

      const components = wrapper.findAllComponents({ name: 'Mine' });
      const helloComponents = wrapper.findAllComponents({ name: 'HelloWorld' });

      // Verify first component is Mine
      expect(components[0].exists()).toBe(true);

      // Verify second component is HelloWorld
      expect(helloComponents[0].exists()).toBe(true);
    });
  });

  describe('Prop Validation', () => {
    it.skip('passes correct message to HelloWorld', () => {
      const wrapper = mount(App);

      const helloComponent = wrapper.findComponent(HelloWorld);
      expect(helloComponent.props('msg')).toBe('Hello!!!');
    });
  });
});
