import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - GetById", () => {
  it("Busca registro por Id", async () => {
    const resposta1 = await testServer
      .post("/cidades")
      .send({ nome: "Caxias do Sul" });
    expect(resposta1.statusCode).toEqual(StatusCodes.CREATED);
    
    const respostaBuscada = await testServer
      .get(`{/cidades/${resposta1.body}`)
      .send();
    expect(respostaBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(respostaBuscada.body).toHaveProperty("nome");
  });
  it("Tenta buscar registro que não existe", async () => {
    const resposta1 = await testServer.get("/cidades/99999").send();

    expect(resposta1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(resposta1.body).toHaveProperty("errors.default");
  });
});
