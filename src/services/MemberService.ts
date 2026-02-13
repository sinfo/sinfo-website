export const MemberService = (() => {
  const getMembers = async (eventId: number): Promise<SINFOMember[] | null> => {
    const memberEndpoint = `${process.env.NEXT_PUBLIC_CANNON_URL}/member`;
    try {
      const resp = await fetch(`${memberEndpoint}`, {
        next: { revalidate: 60 },
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
    const botsTeam = "BOTS";

    try {
      const allMembers = await getMembers(eventId);
      if (!allMembers) return null;
      return allMembers.filter((member) => member.team !== botsTeam);
    } catch (e) {
      console.error(e);
    }
    return null;
  };

  return { getMembers, getFilteredMembers };
})();
