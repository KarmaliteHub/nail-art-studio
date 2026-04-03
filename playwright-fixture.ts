import { test as base, expect } from '@playwright/test';

// Extend basic test by providing custom fixtures
export const test = base.extend({
  // Add custom fixtures here if needed
});

export { expect };