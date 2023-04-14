import { validate, Joi } from 'express-validation';

export default validate({
  body: Joi.object({
    nome: Joi.string().required(),
    email: Joi.string().email().required(),
    idade: Joi.string()
      .required()
      .regex(/^(?:\d{2}\/\d{2}\/\d{4}|\d{2}-\d{2}-\d{4}|\d{2} \d{2} \d{4})$/)
      .message(
        'A data de nascimento deve estar em um dos seguintes formatos: DD/MM/YYYY, DD-MM-YYYY ou DD MM YYYY',
      ),
  }),
});
