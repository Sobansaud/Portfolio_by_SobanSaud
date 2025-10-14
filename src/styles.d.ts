// Allow importing plain CSS files in TypeScript (non-module)
declare module '*.css';
declare module '*.scss';
declare module '*.module.css';
declare module '*.module.scss';

interface ImportMeta {
  readonly env: Record<string, string>;
}
