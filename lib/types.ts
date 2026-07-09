export interface Application {
  id: string;
  name: string;
  owner: string;
  gitlabUrl: string;
  criticalCve: number;
  highCve: number;
  mediumCve: number;
  lowCve: number;
  createdAt: string;
  updatedAt: string;
}

export type VulnerabilitySeverity =
  | 'Critical'
  | 'High'
  | 'Medium'
  | 'Low'
  | 'Info'
  | 'Unknown';

export interface VulnerabilityIdentifier {
  type: string;
  name: string;
  value: string;
  url?: string;
}

export interface ApiVulnerability {
  id: string;
  applicationId: string;
  category: string;
  name: string;
  description: string | null;
  cve: string | null;
  severity: VulnerabilitySeverity;
  scannerId: string | null;
  scannerName: string | null;
  locationFile: string | null;
  locationStartLine: number | null;
  identifiers: VulnerabilityIdentifier[] | null;
  createdAt: string;
  updatedAt: string;
}

export interface ImportResult {
  applicationId: string;
  importedCount: number;
  cveCounts: {
    criticalCve: number;
    highCve: number;
    mediumCve: number;
    lowCve: number;
  };
}
