import * as companyRepository from '../repositories/companyRepository';

export const registerCompanyService = async (companyData: any, options: any) => {
  if (companyData) {
    const existingCompany = await companyRepository.findCompanyByName(companyData.companyName);
    if (existingCompany) throw new Error('Company already exist');
  }
  
  const company = await companyRepository.createCompany(companyData, options);
  if (!company) throw new Error('Failed to create company');

  return {
    companyName: company.dataValues.companyName,
    companyId: company.dataValues.companyId,
    companyIsActive: company.dataValues.active,
    transactionId: options.id
  };
};

export const findCompanyByService = async (companyName: string) => {
  const user = await companyRepository.findCompanyByName(companyName);
  return user
}

