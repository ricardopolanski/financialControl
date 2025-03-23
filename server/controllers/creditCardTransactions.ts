import { Request, Response } from "express";
import { creditCardService } from '../services/creditCardTransactionsService'
import AuthenticatedRequest from "../types/AuthenticatedRequest";

export const creditCardTransactions = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const creditCardData = {
      ...req.body,
      companyId: req.user?.companyId
    }
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


