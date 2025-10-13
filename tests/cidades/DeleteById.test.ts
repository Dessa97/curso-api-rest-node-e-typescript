import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - DeleteById", () => {
  it("Apaga registro", async () => {
    //Cria um registro
    const resposta1 = await testServer
      .post("/cidades")
      .send({ nome: "Caxias do Sul" });

    expect(resposta1.statusCode).toEqual(StatusCodes.CREATED);

    //Apaga resgistro criado 
    const respostaApagada = await testServer
      .delete(`/cidades/${resposta1.body}`)
      .send();
    expect(respostaApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it("Tenta apagar registro que não existe", async () => {
    //chama um ID que não existe
    const resposta1 = await testServer.delete("/cidades/99999").send();

    expect(resposta1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(resposta1.body).toHaveProperty("errors.default");
  });
});
