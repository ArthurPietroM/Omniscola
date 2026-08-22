import '@testing-library/jest-dom';
// jest.setup.ts
import { TextEncoder, TextDecoder } from 'util';

// Injeta o TextEncoder e TextDecoder no ambiente global do Jest
Object.assign(global, { TextEncoder, TextDecoder });