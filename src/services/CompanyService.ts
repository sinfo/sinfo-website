export const CompanyService = (() => {
  const companiesEndpoint = process.env.NEXT_PUBLIC_CANNON_URL + "/company";

  const getCompany = async (id: string): Promise<Company | null> => {
    const resp = await fetch(`${companiesEndpoint}/${id}`, {
      next: { revalidate: 60 },
    });
    if (resp.ok) return (await resp.json()) as Company;
    return null;
  };

  const getCompanies = async (eventId: string): Promise<Company[] | null> => {
    const resp = await fetch(`${companiesEndpoint}?edition=${eventId}`, {
      next: { revalidate: 60 },
    });
    if (resp.ok) return (await resp.json()) as Company[];
    return null;
  };

  return { getCompany, getCompanies };
})();
