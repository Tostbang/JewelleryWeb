import { SVGProps } from "react";

export type IconType = (props: SVGProps<SVGSVGElement>) => React.JSX.Element


export enum Role {
  Admin = 1,
  User = 2
}

export enum DurationType {
  Days = 1,
  Months = 2,
  Years = 3
}

export const DurationTypeLabels: Record<DurationType, string> = {
  [DurationType.Days]: "Gün",
  [DurationType.Months]: "Ay",
  [DurationType.Years]: "Yıl",
}

export enum WeightUnit {
  Gram = 1,
  Kilogram = 2,
  Ounce = 3,
}

export const WeightUnitLabels: Record<WeightUnit, string> = {
  [WeightUnit.Gram]: "Gram",
  [WeightUnit.Kilogram]: "Kilogram",
  [WeightUnit.Ounce]: "Ons",
}