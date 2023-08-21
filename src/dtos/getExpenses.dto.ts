import z from 'zod'


export interface GetExpensesDTO {
    startDate?: Date,
    finalDate?: Date
}

const dateSchema = z.date({description: "Data inválida!", invalid_type_error: "A data deve ser uma string!"}).optional()

export const GetExpensesSchema = z.object(
    {
        startDate: dateSchema,
        finalDate: dateSchema
    }
)

