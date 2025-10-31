export const MemberService = (() => {
  const memberEndpoint = process.env.NEXT_PUBLIC_CANNON_URL + "/member";

  const getMembers = async (): Promise<SinfoMember[] | null> => {
    try {
      const resp = await fetch(`${memberEndpoint}`, {
        next: {
          revalidate: 0, // 1 day
        },
      });
      if (resp.ok) return (await resp.json()) as SinfoMember[];
    } catch (e) {
      console.error(e);
    }
    return null;
  };

  const getFilteredMembers = async (): Promise<SinfoMember[] | null> => {
    const memberEndpoint = process.env.NEXT_PUBLIC_CANNON_URL + "/member";
    const filterNames = ["ToolBot!", "zzPartnernerships"];

    try {
      const resp = await fetch(`${memberEndpoint}`, {
        next: {
          revalidate: 0, // 1 day
        },
      });
      if (resp.ok) {
        const allMembers = (await resp.json()) as SinfoMember[];
        return allMembers.filter(
          (member) => !filterNames.includes(member.name),
        );
      }
    } catch (e) {
      console.error(e);
    }
    return null;
  };

  return { getMembers, getFilteredMembers };
})();
