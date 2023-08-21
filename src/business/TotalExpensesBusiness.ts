import { TotalExpensesDatabase } from "../database/TotalExpensesDatabase";
import { GetExpensesDTO } from "../dtos/getExpenses.dto";

export class TotalExpensesBusiness {

    constructor (
        private totalExpensesDatabase: TotalExpensesDatabase
    ){}

    public getTotalFixedExpense = async (input: GetExpensesDTO) => {
        
        const fixedExpense = await this.totalExpensesDatabase.getTotalFixedExpense(input)

        return fixedExpense
    }
}