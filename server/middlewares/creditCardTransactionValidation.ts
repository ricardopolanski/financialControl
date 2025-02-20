import { body, validationResult, ValidationChain } from 'express-validator'
import { Request, Response, NextFunction } from 'express'

export const validateCCTransaction: (ValidationChain | ((req: Request, res: Response, next: NextFunction) => void)) [] = [
    body('date'),
    body('description'),
    body('amount'),
    body('credit_card'),
    body('status'),
    body('dueDay'),
    body('installment_number'),
    body('notes'),
    
    
]


