import CreditCardTransactions from '../models/creditCardTransactionsModel';

export const creditCardService = async (transactionData: any) => {
  const {
    id,
    transactionDate,
    description,
    amount,
    creditCard,
    status,
    dueDay,
    installmentNumber,
    notes,
    created_ts,
    updated_ts
  } = transactionData;

  // Create CC transaction
  const transaction = await CreditCardTransactions.create({
    id,
    transactionDate,
    description,
    amount,
    creditCard,
    status,
    dueDay,
    installmentNumber,
    notes,
    created_ts,
    updated_ts
  });

  return {
    creditCardBank: transaction.creditCard,
    description: transaction.description,
    transactionDate: transaction.transactionDate,
    dueDate: transaction.dueDay,
    amount: transaction.amount,
    status: transaction.status,
    installmentNumber: transaction.installmentNumber,
    notes: transaction.notes
  }
};
