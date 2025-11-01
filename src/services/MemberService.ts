export const MemberService = (() => {
  const memberEndpoint = process.env.NEXT_PUBLIC_DECK_URL + "/members";

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
    const memberEndpoint = process.env.NEXT_PUBLIC_DECK_URL + "/members";
    const filterTeam = "BOTS";

    try {
      const resp = await fetch(`${memberEndpoint}`, {
        next: {
          revalidate: 0, // 1 day
        },
      });
      if (resp.ok) {
        const allMembers = (await resp.json()) as SINFOMember[];
        return allMembers.filter((member) => member.team !== filterTeam);
      }
    } catch (e) {
      console.error(e);
    }
    return null;
  };

  return { getMembers, getFilteredMembers };
})();
