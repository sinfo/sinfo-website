type Company = {
  id: string;
  name: string;
  description: string;
  img: string;
  site?: string;
  participation: CompanyParticipation[];
};

type CompanyParticipation = {
  event: number;
  partner: boolean;
  package: CompanyPackage;
  standDetails?: StandDetails;
  stands?: Stand[];
};

type CompanyPackage = {
  name: string;
  items: null; // TODO: Define items type
};

type Stand = {
  standId: string;
  date: string;
};

type StandDetails = {
  chairs: number;
  table: boolean;
  lettering: boolean;
};

type Speaker = {
  id: string;
  name: string;
  description: string;
  title: string;
  img: string;
  company?: {
    name?: string;
    img?: string;
  };
  sessions?: SINFOSession[];
  updated?: string;
};

type SINFOSession = {
  id: string;
  name: string;
  description: string;
  kind: string;
  event: string;
  date: string;
  duration: int; // minutes
  place: string;
  img?: string;
  company?: Company;
  speakers?: Speaker[];
  updated?: string;
  tickets?: { needed?: boolean; start?: string; end?: string; max?: number };
  prize?: Prize;
  extraInformation?: {
    type: "info" | "warning" | "danger";
    title?: string;
    content?: string;
  }[];
  users?: string[];
  unregisteredUsers?: number;
};

type SINFOSessionStatus = {
  status: "success" | "already" | "failed";
  participants: string[];
  unregisteredParticipants: number;
};

type Prize = {
  id: string;
  edition: string;
  name: string;
  img: string;
  sessions?: string[];
  days?: string[];
  cv?: boolean;
};

type SINFOMember = {
  name: string;
  img: string;
  socials: Socials;
  sinfo_email: string;
  team: string;
};

type Socials = {
  linkedin?: string;
  github?: string;
  twitter?: string;
  facebook?: string;
  skype?: string;
};

type SINFOEvent = {
  id: number;
  name: string;
  begin: Date;
  end: Date;
  themes: unknown[];
  calendarUrl: string;
  packages: unknown[];
  items: unknown[];
  meetings: unknown[];
  sessions: unknown[];
  teams: string[]; // Array of team IDs
};
