type Company = {
  id: string;
  name: string;
  site: string;
  advertisementLvl: "other" | "min" | "med" | "max" | "none";
  partner: boolean;
  img: string;
  standDetails?: StandDetails;
  stands?: Stand[];
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

  // Optional client-only presentation helpers
  imageName?: string;
  imageNameMobile?: string;
  videoId?: string;
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
  date: Date;
  duration: Date;
  calendarUrl: string;
};
