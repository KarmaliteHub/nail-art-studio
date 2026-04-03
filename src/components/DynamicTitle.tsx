import { useEffect } from "react";
import { useSettings } from "@/hooks/useSettings";
import { APP_CONFIG } from "@/config/app";

interface DynamicTitleProps {
  page?: string;
}

const DynamicTitle = ({ page }: DynamicTitleProps) => {
  const { data: settings } = useSettings();

  useEffect(() => {
    const businessName = settings?.business_name || APP_CONFIG.name;
    const title = page ? `${page} - ${businessName}` : `${businessName} - ${APP_CONFIG.tagline}`;
    document.title = title;
  }, [settings, page]);

  return null;
};

export default DynamicTitle;