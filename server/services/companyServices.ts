import * as companyRepository from '../repositories/companyRepository';

export const registerCompanyService = async (options?: any) => {  
  const company = await companyRepository.createCompany(options);
  if (!company) throw new Error('Failed to create company');

  return {
    companyName: company.dataValues.companyName,
    companyId: company.dataValues.companyId,
    companyIsActive: company.dataValues.active,
    transactionId: options.id
  };
};

