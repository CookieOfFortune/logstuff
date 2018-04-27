export interface CpuLoad {
  id: string;
  timestamp: string;
  cpu_loads: {
    medians: number[];
    stds: number[];
  }
}

export interface CoreLoad {
  timestamp: string;
  median: number;
  std: number;
}

export type Point = [number, number];
