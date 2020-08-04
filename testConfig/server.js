import { setupServer } from 'msw/node';
import { handlers } from './server-handler';
export const server = setupServer(...handlers);
