import Companies from '../models/companiesModel';

export const findCompanyByName = async (companyName: string) => {
  return await Companies.findOne({ where: { companyName } });
};

export const createCompany = async (companydata: any, options: any) => {
  return await Companies.create(companydata, options);
};
