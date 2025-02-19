import CreditCardTransactions from '../models/creditCardTransactionsModel';

export const creditCardService = async (transactionData: any) => {
  const {
    id,
    date,
    description,
    amount,
    credit_card,
    status,
    dueDay,
    installment_number,
    notes,
    created_ts,
    updated_ts
  } = transactionData;

  // Create CC transaction
  const transaction = await CreditCardTransactions.create({
    id,
    date,
    description,
    amount,
    credit_card,
    status,
    dueDay,
    installment_number,
    notes,
    created_ts,
    updated_ts
  });

  return {
    creditCardBank: transaction.credit_card,
    description: transaction.description,
    transactionDate: transaction.date,
    dueDate: transaction.dueDay,
    amount: transaction.amount,
    status: transaction.status,
    installmentNumber: transaction.installment_number,
    notes: transaction.notes
  }
};
