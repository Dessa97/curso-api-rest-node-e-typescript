//Request e Response vêm do Express → são usados para tipar req e res.
import { Request, Response } from "express";
//yup → biblioteca de validação de dados (muito usada para validar body, query e params em APIs).
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";

//Define o shape (formato)
interface IParamProps {
  id?: number;
}

export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    })
  ),
}));

//----------------------------------------Método getById----------------------------------------

export const getById = async (req: Request<IParamProps>, res: Response) => {
  if (Number(req.params.id) === 99999)
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ errors: { default: "Registro não encontrado" } });
  return res.status(StatusCodes.OK).json({
    id: req.params.id,
    nome: "Caxias do Sul",
  });

};
