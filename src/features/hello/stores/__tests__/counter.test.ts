import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useCounterStore } from '../counter';

describe('Counter Store', () => {
  let store: ReturnType<typeof useCounterStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useCounterStore();
  });

  it('should initialize with a count of 0', () => {
    expect(store.count).toBe(0);
  });

  it('should have a doubleCount computed property that returns twice the count', () => {
    expect(store.doubleCount).toBe(0);

    store.increment();
    expect(store.doubleCount).toBe(2);
  });

  it('should increment the count correctly', () => {
    expect(store.count).toBe(0);

    store.increment();
    expect(store.count).toBe(1);

    store.increment();
    expect(store.count).toBe(2);
  });

  it('should maintain the relationship between count and doubleCount', () => {
    store.increment();
    store.increment();

    expect(store.count).toBe(2);
    expect(store.doubleCount).toBe(4);
  });
});
