import { Request, Response } from "express";
import { creditCardService } from '../services/creditCardTransactionsService'


export const creditCardTransactions = async (req: Request, res: Response): Promise<void> => {
  try {
    const creditCardData = req.body;
        const creditCardTransaction = await creditCardService(creditCardData)
        res.status(201).json({
          success: true,
          statusCode: 201,
          data: creditCardTransaction
        })
    
    res.json(creditCardTransactions);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal Server Error" });
  }
};


