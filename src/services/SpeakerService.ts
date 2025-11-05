export const SpeakerService = (() => {
  const speakersEndpoint = process.env.NEXT_PUBLIC_CANNON_URL + "/speaker";

  const getSpeaker = async (id: string): Promise<Speaker | null> => {
    const resp = await fetch(`${speakersEndpoint}/${id}`, {
      cache: "force-cache",
    });
    if (resp.ok) return (await resp.json()) as Speaker;
    return null;
  };

  const getSpeakers = async ({
    event,
  }: {
    event: number;
  }): Promise<Speaker[] | null> => {
    const resp = await fetch(`${speakersEndpoint}?event=${event}`, {
      cache: "force-cache",
    });
    if (resp.ok) {
      const { speakers }: { speakers: Speaker[] } = await resp.json();
      return speakers;
    }
    return null;
  };

  // TODO: Replace with real API call with all information when available
  const getPreviousEditionSpeakersHighlight = async (): Promise<Speaker[]> => {
    const ids = [
      // "6480a212a4e6c9a68843d549", // Aleksa Gordić
      "64a73a3f5e2cfce18d990c8d", // Shivani Poddar
      "64beae835e2cfce18d9912cc", // Nemanja Rakicevic
      "66dc4093aa43584e5fa98d1e", // Naman Govil
      // "6537e3631410063dac6daa96", // Rohit Patel
      "65a06f4d7562d858c0c9b2b3", // João Gante
      "64a898125e2cfce18d990d19", // Abby LeMaster
      "64a5b6e25e2cfce18d990b38", // Isaque Sanches
      "668583d18d9f35b1d1ca109e", // Ere Santos
      "656752c352c359b9a5ed7c86", // Cody Lyon
      "6480a212a4e6c9a68843c9b1", // Roger Dingledine
      "64c769065e2cfce18d9917ed", // Joseph Katsioloudes
    ];
    // Presentation metadata: explicit mapping of speaker id -> YouTube video id
    // This avoids confusion from index-based lists and makes assignment explicit.
    const videoMap: Record<string, string> = {
      "6480a212a4e6c9a68843d549": "vVXQa0ie4BM", // Aleksa Gordić
      "64a73a3f5e2cfce18d990c8d": "8LhlLrrYG7Y", // Shivani Poddar
      "64beae835e2cfce18d9912cc": "XwRzfSJ4040", // Nemanja Rakicevic
      "66dc4093aa43584e5fa98d1e": "n1uqD2h2vy0", // Naman Govil
      "6537e3631410063dac6daa96": "", // Rohit Patel
      "65a06f4d7562d858c0c9b2b3": "xA3c3dUt_X4", // João Gante
      "64a898125e2cfce18d990d19": "qG9_o7KHRMU", // Abby LeMaster
      "64a5b6e25e2cfce18d990b38": "cbC_AhtS0-I", // Isaque Sanches
      "668583d18d9f35b1d1ca109e": "Jpgw8ssJXFQ", // Ere Santos
      "656752c352c359b9a5ed7c86": "R4Uho3ZUQzY", // Cody Lyon
      "6480a212a4e6c9a68843c9b1": "evh9dfGd3eY", // Roger Dingledine
      "64c769065e2cfce18d9917ed": "6dRaWG7ANrk", // Joseph Katsioloudes
    };
    const speakers = await Promise.all(
      ids.map(async (id, idx) => {
        try {
          const s = await getSpeaker(id);
          if (!s) return null;

          const imageName = "/images/speakers/" + s.id + ".jpg";
          const videoId = videoMap[id] ?? "";
          return { ...s, imageName, videoId } as Speaker;
        } catch {
          return null;
        }
      }),
    );

    return speakers.filter((s): s is Speaker => s != null);
  };

  return { getSpeaker, getSpeakers, getPreviousEditionSpeakersHighlight };
})();
