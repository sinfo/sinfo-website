const MOCK_MEMBERS: SINFOMember[] = Array.from({ length: 12 }, (_, i) => ({
  name: "Afonso Bastos",
  img: "https://static.sinfo.org/deck2-dev/sinfo-33/members/683a44812a6a7f23bc9fab54",
  team: "Multimédia",
  social: {
    linkedin: "https://www.linkedin.com",
  },
  sinfo_email: `afonso.bastos${i}@sinfo.org`,
}));

export default MOCK_MEMBERS;
