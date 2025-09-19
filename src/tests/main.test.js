import { Start } from '../game/scenes/Start.js';
import { Tutorial } from '../game/scenes/Tutorial.js';

describe('Game Scenes', () => {
  test('Start scene should be defined', () => {
    expect(Start).toBeDefined();
  });
  test('Tutorial scene should be defined', () => {
    expect(Tutorial).toBeDefined();
  });
});
