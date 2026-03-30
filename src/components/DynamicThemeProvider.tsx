import { useEffect } from "react";
import { useSettings } from "@/hooks/useSettings";

function hexToHSL(hex: string): string | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return null;

  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

function generateSecondaryHSL(hex: string): string | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return null;
  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  if (max !== min) {
    const d = max - min;
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return `${Math.round(h * 360)} 40% 92%`;
}

const DynamicThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: settings } = useSettings();

  useEffect(() => {
    if (!settings) return;
    const root = document.documentElement;

    const primaryHSL = hexToHSL(settings.primary_color);
    const secondaryHSL = hexToHSL(settings.secondary_color);
    const accentHSL = hexToHSL(settings.accent_color);

    if (primaryHSL) {
      root.style.setProperty("--primary", primaryHSL);
      root.style.setProperty("--ring", primaryHSL);
      root.style.setProperty("--sidebar-primary", primaryHSL);
      root.style.setProperty("--sidebar-ring", primaryHSL);
    }
    if (secondaryHSL) {
      root.style.setProperty("--secondary", secondaryHSL);
      const mutedFromSecondary = generateSecondaryHSL(settings.secondary_color);
      if (mutedFromSecondary) {
        root.style.setProperty("--sidebar-accent", mutedFromSecondary);
      }
    }
    if (accentHSL) {
      root.style.setProperty("--accent", accentHSL);
    }
  }, [settings]);

  return <>{children}</>;
};

export default DynamicThemeProvider;
