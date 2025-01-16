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

export interface Employee {
  ID: number; // Unique identifier for the employee
  Name: string; // Full name of the employee
  Job_Title: string; // The employee's job title (e.g., "Software Engineer")
  Department: string; // Department the employee belongs to (e.g., "HR", "IT")
  Email: string; // Email address of the employee
  Phone: string; // Contact phone number
  Profile_Picture: string | null; // URL or path to the profile picture (null if none)
  Gender : string;
  Date_of_Birth: string; // Date of birth in YYYY-MM-DD format
}


export interface AddLeadProps {
  onAddLead: (newLead: Omit<Lead, 'ID'>) => void;
  onCancel: () => void;
}

export interface EmployeeProps {
  onAddEmployee: (newEmployee: Omit<Employee, 'ID'>) => void; // Function to handle adding a new employee
  onCancel: () => void; // Function to handle canceling an operation
}

export interface EmployeesTableDataProps {
  rows: Employee[]; // Array of employees to be displayed in a table
}


export interface LeadsTableDataProps {
  rows: Lead[];
}

