import { CSSProperties } from "react";

export function withDefaultValue(
  currentStyle: CSSProperties | undefined,
  defaultValues: CSSProperties
): CSSProperties {
  const mergedStyle = { ...currentStyle };

  for (const key in defaultValues) {
    if (Object.prototype.hasOwnProperty.call(defaultValues, key)) {
      mergedStyle[key] ??= defaultValues[key];
    }
  }

  return mergedStyle;
}
