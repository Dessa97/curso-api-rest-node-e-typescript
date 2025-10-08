//Request e Response vêm do Express → são usados para tipar req e res.
import { Request, Response } from "express";
//yup → biblioteca de validação de dados (muito usada para validar body, query e params em APIs).
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";

//Define o shape (formato) esperado do body da requisição.
interface ICidade {
  nome: string;
}

export const createValidation = validation((getSchema) => ({
  body: getSchema<ICidade>(
    yup.object().shape({
      nome: yup.string().required().min(3),
    })
  ),
}));

//----------------------------------------Método create----------------------------------------
//--------------------------------Request<Params, ResBody, ReqBody> - aqui o body do req tem o formato da interface ICidade.
export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
  console.log(req.body);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("não implementado");
};
