export interface AddLeadProps {
  onAddLead: (newLead: Omit<Lead, 'ID'>) => void;
  onCancel: () => void;
}
export interface Lead {
  ID: string;
  Job_Title: string;
  Lead: string;
  BD: string;
  Dev: string;
  Status: string;
  InterviewStage: string[];
  description: string;
  resume?: string | null;
}

export interface LeadsTableDataProps {
  rows: Lead[];
}
