import CreditCardTransactions from '../models/creditCardTransactionsModel'

export const getAllTransactions = async () => {
    return await CreditCardTransactions.findAll()
}