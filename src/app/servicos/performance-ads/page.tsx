
import type { Metadata } from 'next';
import { PerformanceAdsClient } from "./performance-ads-client";

export const metadata: Metadata = {
  title: 'Performance Ads & Google Ads | studiosapient',
  description: 'Domine as buscas de urgência e maximize seu ROI com campanhas de tráfego pago focadas em conversão real e inteligência de dados.',
};

export default function PerformanceAdsPage() {
  return <PerformanceAdsClient />;
}
