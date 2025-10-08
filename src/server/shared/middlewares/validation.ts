import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { ObjectSchema, ValidationError } from "yup";

type TProperty = "body" | "header" | "params" | "query";
type TGetSchema = <T extends object>(schema: ObjectSchema<T>) => ObjectSchema<T>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TAllSchemas = Record<TProperty, ObjectSchema<any>>;
type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>;
type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;

export const validation: TValidation =
  (getAllSchemas) => async (req, res, next) => {
    const schemas = getAllSchemas((schema) => schema);
    const errorsResult: Record<string, Record<string, string>> = {};
    Object.entries(schemas).forEach(([key, schema]) => {
      try {
        //{abortEarly: false} - retorna todos os erros de uma vez.
        schema.validateSync(req[key as TProperty], { abortEarly: false });
      } catch (err) {
        //O error é convertido para o tipo yup.ValidationError
        const yupError = err as ValidationError;
        //------------Record<chave(campo), valor(mensagem de erro)>
        const errors: Record<string, string> = {};
        //yupError.inner → array com detalhes de cada erro por campo (path e message). O .forEach percorre todos os erros.
        yupError.inner.forEach((error) => {
          if (error.path === undefined) return;
          errors[error.path] = error.message;
        });
        errorsResult[key] = errors;
      }
    });
    if (Object.entries(errorsResult).length === 0) {
      return next();
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({
        errors: errorsResult,
      });
    }
  };
