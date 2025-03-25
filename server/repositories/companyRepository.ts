import Companies from '../models/companiesModel';

export const findCompanyByName = async (companyName: string) => {
  return await Companies.findOne({ where: { companyName } });
};

export const createCompany = async (options: any) => {
  return await Companies.create(options);
};

export const findCompanyById = async (companyId: string) => {
  return await Companies.findOne({ where: { companyId } });
};
