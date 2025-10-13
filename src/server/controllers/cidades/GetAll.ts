//Request e Response vêm do Express → são usados para tipar req e res.
import { Request, Response } from "express";
//yup → biblioteca de validação de dados (muito usada para validar body, query e params em APIs).
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";

//Define o shape (formato)
interface IQueryProps {
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(
    yup.object().shape({
      page: yup.number().optional().moreThan(0),
      limit: yup.number().optional().moreThan(0),
      filter: yup.string().optional(),
    })
  ),
}));

//----------------------------------------Método getAll----------------------------------------
//--------------------------------Request<Params, ResBody, ReqBody, ReqQuery> - aqui o query do req tem o formato da interface IQueryProps.
export const getAll = async (
  req: Request<{}, {}, {}, IQueryProps>,
  res: Response
) => {
  res.setHeader("access-control-expose-headers", "x-total-count");
  res.setHeader("x-total-count", 1);
  return res.status(StatusCodes.OK).json([
    { id: 1, 
      nome: "Caxias do Sul" }]);
};
