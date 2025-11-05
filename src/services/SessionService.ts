export const SessionService = (() => {
  const sessionsEndpoint = process.env.NEXT_PUBLIC_CANNON_URL + "/session";

  const getSession = async (
    sessionId: string,
  ): Promise<SINFOSession | null> => {
    const resp = await fetch(`${sessionsEndpoint}/${sessionId}`, {
      cache: "force-cache",
    });
    if (resp.ok) return (await resp.json()) as SINFOSession;
    return null;
  };

  const getSessions = async (): Promise<SINFOSession[] | null> => {
    const resp = await fetch(sessionsEndpoint, {
      cache: "force-cache",
    });
    if (resp.ok) return (await resp.json()) as SINFOSession[];
    return null;
  };

  return { getSession, getSessions };
})();
