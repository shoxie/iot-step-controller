export interface BoxData {
  code: string;
  name: string;
}

export type NullableBoxData = BoxData | null;
export interface BoxTableProps {
  boxesData: NullableBoxData[];
}

export interface MovementInstruction {
  axis: string;
  units: number;
  direction: number;
}

export interface CursorPosition {
  x: {
    units: number;
    direction: number;
    axis: string;
  };
  y: {
    units: number;
    direction: number;
    axis: string;
  };
}
