export const CompanyService = (() => {
  const companiesEndpoint = process.env.NEXT_PUBLIC_DECK_URL + "/companies";

  const getCompany = async (id: string): Promise<Company | null> => {
    const resp = await fetch(`${companiesEndpoint}/${id}`, {
      cache: 'no-store',
    });
    if (resp.ok) return (await resp.json()) as Company;
    return null;
  };

  const getCompanies = async (eventId: string): Promise<Company[] | null> => {
    const resp = await fetch(`${companiesEndpoint}?event=${eventId}`, {
      cache: 'no-store',
    });
    if (resp.ok) return (await resp.json()) as Company[];
    return null;
  };

  return { getCompany, getCompanies };
})();
