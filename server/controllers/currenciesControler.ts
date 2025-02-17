import { Request, Response } from "express";
import Currencies from "../models/currencyModel";


export const currencies = async (req: Request, res: Response): Promise<void> => {
  try {
    const currencies = await Currencies.findAll({
      attributes: ["currency", "currency_code", "currency_symbol"],
    });
    
    res.json(currencies);
  } catch (error) {
    console.error("Error fetching currencies:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
