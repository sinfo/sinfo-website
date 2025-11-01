export const CompanyService = (() => {
  const companiesEndpoint = process.env.NEXT_PUBLIC_DECK_URL + "/companies";

  const getCompany = async (id: string): Promise<Company | null> => {
    const resp = await fetch(`${companiesEndpoint}/${id}`, {
      next: {
        revalidate: 0, // 1 day
      },
    });
    if (resp.ok) return (await resp.json()) as Company;
    return null;
  };

  const getCompanies = async (eventId: string): Promise<Company[] | null> => {
    const resp = await fetch(`${companiesEndpoint}?event=${eventId}`, {
      next: {
        revalidate: 0, // 1 day
      },
    });
    if (resp.ok) return (await resp.json()) as Company[];
    return null;
  };

  return { getCompany, getCompanies };
})();
