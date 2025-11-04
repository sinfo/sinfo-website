export const MemberService = (() => {
  const getMembers = async (eventId: number): Promise<SINFOMember[] | null> => {
    const memberEndpoint = `${process.env.NEXT_PUBLIC_DECK_URL}/members?event=${eventId}`;
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

  const getFilteredMembers = async (
    eventId: number,
  ): Promise<SINFOMember[] | null> => {
    const memberEndpoint = `${process.env.NEXT_PUBLIC_DECK_URL}/members?event=${eventId}`;
    const filterTeam = "BOTS";

    try {
      const allMembers = await getMembers(eventId);
      if (!allMembers) return null;
      return allMembers.filter((member) => member.team !== filterTeam);
    } catch (e) {
      console.error(e);
    }
    return null;
  };

  return { getMembers, getFilteredMembers };
})();
