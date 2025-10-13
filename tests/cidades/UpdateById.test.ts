import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - UpdateById", () => {
  it("Atualiza registro", async () => {
    const resposta1 = await testServer
      .post("/cidades")
      .send({ nome: "Caxias do Sul" });

    expect(resposta1.statusCode).toEqual(StatusCodes.CREATED);
    const respostaAtualizada = await testServer
      .put(`/cidades/${resposta1.body}`)
      .send({ nome: "Caxias" });
    expect(respostaAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it("Tenta atualizar registro que não existe", async () => {
    const resposta1 = await testServer
      .put("/cidades/99999")
      .send({ nome: "Caxias" });

    expect(resposta1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(resposta1.body).toHaveProperty("errors.default");
  });
});
