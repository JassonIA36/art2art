import type { MockupGarmentId } from '../types';

export const selectGarmentInStudio = (id: MockupGarmentId) => {
  window.dispatchEvent(new CustomEvent<MockupGarmentId>('art2art:select-garment', { detail: id }));
};
