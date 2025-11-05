export const MemberService = (() => {
  const getMembers = async (eventId: number): Promise<SINFOMember[] | null> => {
    const memberEndpoint = `${process.env.NEXT_PUBLIC_CANNON_URL}/member`;
    try {
      const resp = await fetch(`${memberEndpoint}`, {
        cache: "force-cache",
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
    const filterNames = ["zzPartnernerships", "ToolBot!"];

    try {
      const allMembers = await getMembers(eventId);
      if (!allMembers) return null;
      return allMembers.filter((member) => !filterNames.includes(member.name));
    } catch (e) {
      console.error(e);
    }
    return null;
  };

  return { getMembers, getFilteredMembers };
})();
