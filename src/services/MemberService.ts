export const MemberService = (() => {
  const memberEndpoint = process.env.NEXT_PUBLIC_DECK_URL + "/members?event=33";

  const getMembers = async (): Promise<SINFOMember[] | null> => {
    try {
      const resp = await fetch(`${memberEndpoint}`, {
        next: {
          revalidate: 0, // 1 day
        },
      });
      if (resp.ok) return (await resp.json()) as SINFOMember[];
    } catch (e) {
      console.error(e);
    }
    return null;
  };

  const getFilteredMembers = async (): Promise<SINFOMember[] | null> => {
    const memberEndpoint = process.env.NEXT_PUBLIC_DECK_URL + "/members?event=33";
    const filterTeam = "BOTS";
    console.log("Filtering out team:", filterTeam, "from endpoint:", memberEndpoint);

    try {
      const resp = await fetch(`${memberEndpoint}`, {
        next: {
          revalidate: 0, // 1 day
        },
      });
      if (resp.ok) {
        const allMembers = (await resp.json()) as SINFOMember[];
        console.log("Total members fetched:", allMembers.length);
        return allMembers.filter((member) => member.team !== filterTeam);
      }
    } catch (e) {
      console.error(e);
    }
    return null;
  };

  return { getMembers, getFilteredMembers };
})();
