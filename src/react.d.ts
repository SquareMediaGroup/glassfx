import type { ComponentType, ElementType, ReactNode } from "react";

export function GlassFilter(): null;

export function useGlass(): void;

export interface GlassModifierProps {
  refract?: boolean;
  strong?: boolean;
  pill?: boolean;
  opaque?: boolean;
  translucent?: boolean;
  size?: "sm" | "md" | "xl";
  className?: string;
}

export function glassClassName(opts?: GlassModifierProps): string;

export type GlassProps = GlassModifierProps & {
  as?: ElementType;
  children?: ReactNode;
  tilt?: boolean;
} & Record<string, unknown>;

export const Glass: ComponentType<GlassProps>;
export default Glass;
