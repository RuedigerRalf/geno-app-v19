
// insight-card-data.ts
export interface InsightCardData {
  icon: string;          // z. B. Material Icon Name oder URL
  title: string;
  subtitle?: string;
  confidence?: number;   // 0–100
  tags?: string[];
  detailsHtml?: string;  // Inhalt für den Dialog
}
