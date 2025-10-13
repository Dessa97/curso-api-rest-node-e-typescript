import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - Create", () => {
  it("Cria registro", async () => {
    const resposta1 = await testServer
      .post("/cidades")
      .send({ nome: "Caxias do Sul" });
    console.log(resposta1.body);
    expect(resposta1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof resposta1.body).toEqual("number");
  });
  it("Tenta criar registro com nome muito curto", async () => {
    const resposta1 = await testServer.
    post("/cidades").
    send({ nome: "Ca" });

    expect(resposta1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resposta1.body).toHaveProperty("errors.body.nome");
  });
});
