import { z } from 'zod';
import validator from 'validator';

export const createTransactionSchema = z.object({
  user_id: z
    .string({
      message: 'User id is required.',
    })
    .uuid(),
  name: z
    .string({
      message: 'Name is required.',
    })
    .trim()
    .min(1, {
      message: 'Name is required.',
    }),
  date: z
    .string({
      message: 'Date is required.',
    })
    .datetime({
      message: 'Date must be a valid date.',
    }),
  type: z.enum(['EARNING', 'INVESTMENT', 'EXPENSE'], {
    message: 'Type is required.',
  }),
  amount: z
    .number({
      invalid_type_error: 'Amount must be a number.',
    })
    .min(1, {
      message: 'Amount must be greater than 0.',
    })
    .refine((value) => {
      validator.isCurrency(value.toFixed(2), {
        digits_after_decimal: [2],
        allow_negatives: false,
      });
    }),
});
