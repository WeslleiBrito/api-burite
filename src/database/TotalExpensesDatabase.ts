import { BaseDatabase } from "./BaseDatabase";
import { GetExpensesDTO } from "../dtos/getExpenses.dto";


export class TotalExpensesDatabase extends BaseDatabase {

    public getTotalFixedExpense = async (input: GetExpensesDTO) => {

        const {startDate, finalDate} = input
        const dateNow = new Date()
        const dateNowFormanted = `${dateNow.getFullYear()}/${String(dateNow.getMonth())}/${String(dateNow.getDay())}`
    
        const [expensesFixed] = await TotalExpensesDatabase.connection("tipoconta")
        .sum("pagar_rateio.rateio_vlrpagoparcela as expenseFixed")
        .innerJoin("pagar_rateio", "tipoconta.tipocont_descricao", "pagar_rateio.rateio_tpcontanome")
        .whereBetween("pagar_rateio.rateio_dtvencimento", [startDate ? `${startDate.getFullYear()}-${startDate.getMonth()}-${startDate.getDay()}` : "2020-08-26", finalDate ? `${finalDate.getFullYear()}-${finalDate.getMonth()}-${finalDate.getDay()}` : dateNowFormanted])
        .andWhere("tipoconta.conta_fixa", "=", 1)

        const [expensesVariable] = await TotalExpensesDatabase.connection("tipoconta")
        .sum("pagar_rateio.rateio_vlrpagoparcela as expenseVariable")
        .innerJoin("pagar_rateio", "tipoconta.tipocont_descricao", "pagar_rateio.rateio_tpcontanome")
        .whereBetween("pagar_rateio.rateio_dtvencimento", [startDate ? `${startDate.getFullYear()}-${startDate.getMonth()}-${startDate.getDay()}` : "2020-08-26", finalDate ? `${finalDate.getFullYear()}-${finalDate.getMonth()}-${finalDate.getDay()}` : dateNowFormanted])
        .andWhere("tipoconta.conta_fixa", "=", 0)
        .whereNotIn("tipoconta.tipocont_cod", [75, 79])

        console.log("Data inicial:", startDate?.getMonth(), "Data final:", finalDate)
        console.log("Data: ", [startDate ? `${startDate.getFullYear()}-${startDate.getDate()}-${startDate.getDay()}` : "2020-08-26", finalDate ? `${finalDate.getFullYear()}-${finalDate.getMonth()}-${finalDate.getDay()}` : dateNowFormanted])
        
        return Object.assign(expensesFixed, expensesVariable)
    }
}