//Request e Response vêm do Express → são usados para tipar req e res.
import { Request, Response } from "express";
//yup → biblioteca de validação de dados (muito usada para validar body, query e params em APIs).
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import { ICidade } from "../../database/models";
import { CidadesProvider } from "../../database/providers/cidades";

//Define o shape (formato) esperado do body da requisição.
interface IBodyProps extends Omit<ICidade, "id"> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      nome: yup.string().required().min(3).max(150),
    })
  ),
}));

//----------------------------------------Método create----------------------------------------
//--------------------------------Request<Params, ResBody, ReqBody> - aqui o body do req tem o formato da interface ICidade.
export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
  const result = await CidadesProvider.create(req.body);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }
  return res.status(StatusCodes.CREATED).json(result);
};
