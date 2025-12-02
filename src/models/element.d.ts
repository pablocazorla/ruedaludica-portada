export interface Element {
  id: string;
  visible?: boolean;
  // base
  name?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  scale?: number;
  rotation?: number;
  color?: string;
  borderWidth?: number;
  borderColor?: string;
  shadow?: string;
  blur?: number;
  opacity?: number;
  // clip
  clip?: string;
  // img
  img?: string;
  // text
  text?: string;
  fontSize?: number;
  lineHeight?: number;
  bold?: boolean;
  italic?: boolean;
  uppercase?: boolean;
  underline?: boolean;
  textAlign?: string;
  fontFamily?: string;
  //shape
  radius?: number;
}
