export const SpeakerService = (() => {
  const speakersEndpoint = process.env.NEXT_PUBLIC_CANNON_URL + "/speaker";

  const getSpeaker = async (id: string): Promise<Speaker | null> => {
    const resp = await fetch(`${speakersEndpoint}/${id}`, {
      next: {
        revalidate: 0, // 1 day
      },
    });
    if (resp.ok) return (await resp.json()) as Speaker;
    return null;
  };

  const getSpeakers = async ({ event }: { event: number }): Promise<Speaker[] | null> => {
    const resp = await fetch(`${speakersEndpoint}?event=${event}`, {
      next: {
        revalidate: 0, // 1 day
      },
    });
    if (resp.ok) {
      const { speakers }: { speakers: Speaker[] } = await resp.json();
      return speakers;
    }
    return null;
  };

  const getPreviousEditionSpeakersHighlight = async () => [
  {
    id: "luis-pollo",
    name: "Luis Pollo",
    description:
      "30 years’ experience in the interactive industry as a writer and director of award-winning AAA narrative game experiences, most notably Sony Computer Entertainment’s acclaimed, billion-dollar Uncharted franchise.\n\nSpecialties: Creative Direction, Worldbuilding and Narrative Design, Story and Screenwriting, Game Design, Performance Capture Direction and Virtual Production, Casting, VO Direction",
    title: "Creative Director and Writer",
    img: "https://cdn.mos.cms.futurecdn.net/vx2SDJK7S3SLNiq8RUJ2LA-1200-80.png",
    img_sinfo: "speaker1.jpg",
    company: {
      name: "Bliss",
      img: "https://sinfo.ams3.cdn.digitaloceanspaces.com/static/24-sinfo/companies/bliss.png",
    },
  },
  {
    id: "speaker_2",
    name: "Ben Vandenberghe",
    description:
      "CEO at Skyline Communications. Specialties: Open end-to-end multi-vendor network management solutions for the IPTV, HFC broadband, satellite and broadcast industry.",
    title: "CEO, Skyline Communications",
    img: "https://pbs.twimg.com/profile_images/1030128786438729728/LI44Gg77_400x400.jpg",
    img_sinfo: "speaker2.jpg",
  },
  {
    id: "speaker_3",
    name: "Bill Gates",
    description:
      "Philanthropist, entrepreneur, and co-founder of Microsoft. Known for his significant contributions to technology and global health initiatives through the Bill & Melinda Gates Foundation.",
    title: "Co-Founder, Microsoft",
    img: "https://ep01.epimg.net/estaticos/arc/2021/02/entrevista/img/bill.jpg",
    company: {
      name: "Microsoft",
      img: "https://sinfo.ams3.cdn.digitaloceanspaces.com/static/25-sinfo/companies/microsoft.png",
    },
    img_sinfo: "speaker3.jpg",
  },
  {
    id: "speaker_4",
    name: "David Miotke",
    description:
      "Dave Miotke is an experienced Producer who lives, breathes, and dreams Video Games; especially simulation! Working closely with multi-disciplinary, cross-functional teams to create something magical is where he always wants to be. For the last 15 years, he has been working as a developer at Maxis and on The Sims. Early in a project, he helps to pitch and refine ideas and concepts. If a pitch is green-lit, he helps to further clarify and prioritize features for the pack as well as communicate the intent and ongoing progress team-wide. Later in the project, he helps to evaluate the software and plan for iteration and/or additions to maintain a high-quality bar for the players.",
    title: "Producer, Maxis (The Sims)",
    img: "https://media.contentapi.ea.com/content/dam/www-thesims/2017/02/DaveMiotke_SGNinja.jpg.adapt.crop16x9.575p.jpg",
    company: {
      name: "Cloudflare",
      img: "https://static.sinfo.org/static%2F30-sinfo%2FcompanyLogos%2FCloudFlare-01.webp",
    },
    img_sinfo: "speaker4.jpg",
  },
  {
    id: "speaker_5",
    name: "Manuel Sousa",
    description:
      "Experienced Information Security Engineer specializing in protecting data and systems for large-scale organizations. Skilled in cybersecurity strategy, threat analysis, and implementing secure protocols.",
    title: "Information Security Engineer @ Google",
    img: "https://media.licdn.com/dms/image/v2/D5603AQH5kR-KsoQnYA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1710492770943?e=1763596800&v=beta&t=qwQ8vT5qrWGQC6BFE5YjItRb_EK7kx6IHpv-jJEBxQM",
    company: {
      name: "Google",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png",
    },
    img_sinfo: "speaker5.jpg",
  },
]

  return { getSpeaker, getSpeakers, getPreviousEditionSpeakersHighlight };
})();
