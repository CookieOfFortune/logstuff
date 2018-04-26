export interface CpuLoads {
  id: string;
  timestamp: string;
  cpu_loads: {
    medians: number[];
    stds: number[];
  }
}