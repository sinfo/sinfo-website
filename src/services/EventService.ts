export const EventService = (() => {
  const eventEndpoint = process.env.NEXT_PUBLIC_DECK_URL + "/events";

  const getLatest = async (): Promise<SINFOEvent | null> => {
    try {
      const resp = await fetch(`${eventEndpoint}/latest`, {
        cache: 'no-store',
      });
      if (resp.ok) return (await resp.json()) as SINFOEvent;
    } catch (e) {
      console.error(e);
    }
    return null;
  };

  return { getLatest };
})();
