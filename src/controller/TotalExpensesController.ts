import { Request, Response } from "express";
import { TotalExpensesBusiness } from "../business/TotalExpensesBusiness";
import { ZodError } from "zod";
import { GetExpensesSchema } from "../dtos/getExpenses.dto";

export class TotalExpensesController {

    constructor(
        private totalExpessesBusiness: TotalExpensesBusiness
    ){}

    public getTotalFixedExpense = async (req: Request, res: Response) => {
        
        try {
            const input = GetExpensesSchema.parse(
                {
                    startDate: req.body.startDate ? new Date(req.body.startDate) : req.body.startDate,
                    finalDate: req.body.finalDate ? new Date(req.body.finalDate) : req.body.finalDate
                }
            )

            const fixedExpense = await this.totalExpessesBusiness.getTotalFixedExpense(input)

            res.status(200).send(
                fixedExpense
            )
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
              } else {
                res.status(500).send("Erro inesperado")
              }
        }
    }

}