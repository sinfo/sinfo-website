export const MemberService = (() => {
  const getMembers = async (eventId: number): Promise<SINFOMember[] | null> => {
    const memberEndpoint = `${process.env.NEXT_PUBLIC_CANNON_URL}/member`;
    try {
      const resp = await fetch(`${memberEndpoint}`, {
        cache: "no-store",
      });
      if (resp.ok) {
        const data = await resp.json();
        console.log("🔍 Total members:", data.length);
        console.log("🔍 First member:", JSON.stringify(data[0], null, 2));
        console.log("🔍 Has social?", data[0]?.social);
        console.log("🔍 LinkedIn:", data[0]?.social?.linkedin);
        return data as SINFOMember[];
      }
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
      const filtered = allMembers.filter((member) => member.team !== botsTeam);
      console.log(
        "🔍 With LinkedIn:",
        filtered.filter((m) => m.social?.linkedin).length,
        "of",
        filtered.length,
      );
      return filtered;
    } catch (e) {
      console.error(e);
    }
    return null;
  };

  return { getMembers, getFilteredMembers };
})();
