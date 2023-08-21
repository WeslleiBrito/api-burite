import express from "express"
import { TotalExpensesController } from "../controller/TotalExpensesController"
import { TotalExpensesBusiness } from "../business/TotalExpensesBusiness"
import { TotalExpensesDatabase } from "../database/TotalExpensesDatabase"

export const expenseRouter = express.Router()


const expensesController = new TotalExpensesController(
    new TotalExpensesBusiness(
        new TotalExpensesDatabase()
    )
)

expenseRouter.get("/", expensesController.getTotalFixedExpense)