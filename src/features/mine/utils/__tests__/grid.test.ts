import { describe, it, expect } from 'vitest';
import { generateGrid } from '../grid';

describe('generateGrid', () => {
  it('should create a grid with correct dimensions', () => {
    const grid = generateGrid(10, 10, 15);
    expect(grid.length).toBe(100);
  });
});
