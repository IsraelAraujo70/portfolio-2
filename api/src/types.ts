// Flux Context type definition (runtime is injected by FOA)
interface FluxContext {
  req: any;
  res: any;
  input: any;
  results: Record<string, any>;
  state: Record<string, any>;
  args?: Record<string, any>;
  plugins: {
    db: {
      query: (sql: string, params?: any[]) => Promise<{ rows: any[] }>;
      pool: any;
    };
    [key: string]: any;
  };
  [key: string]: any;
}

export type { FluxContext };
