
export interface Contact {
  id: number;
  officeName: string;
  officeType: 'County Clerk' | 'Recorder of Deeds' | 'Property Assessor' | 'Tax Collector' | 'Registrar of Voters';
  state: string;
  county: string;
  phone: string;
  website: string;
  address: string;
}
