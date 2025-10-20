import { ICidade } from "../../models";

declare module "knrx/types/tables" {
  interface Tables {
    cidade: ICidade;
    //pessoa: IPessoa
    //usuario: IUsuario
  }
}
