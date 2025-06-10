// global.d.ts
declare global {
  namespace NodeJS {
    interface Global {
      mongoose: typeof import('mongoose');
    }
  }
}

export {};
