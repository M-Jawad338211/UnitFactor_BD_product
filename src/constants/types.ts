export interface Lead {
  ID: number;
  Job_Title: string;
  Lead: string;
  BD: string;
  Dev: string | null;
  Status: string;
  InterviewStage: string[];
  description: string;
  resume: string | null; // Changed from File | null to string | null
  Interviewer: string[];
}

export interface AddLeadProps {
  onAddLead: (newLead: Omit<Lead, 'ID'>) => void;
  onCancel: () => void;
}

export interface LeadsTableDataProps {
  rows: Lead[];
}