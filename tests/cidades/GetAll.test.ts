import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - GetAll", () => {
  it("Busca todos os registros", async () => {
    //Cria registro
    const resposta1 = await testServer
      .post("/cidades")
      .send({ nome: "Caxias do Sul" });

    expect(resposta1.statusCode).toEqual(StatusCodes.CREATED);

    const respostaBuscada = await testServer
    .get(`/cidades`)
    .send();

    expect(Number(respostaBuscada.header["x-total-count"])).toBeGreaterThan(0);
    expect(respostaBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(respostaBuscada.body.length).toBeGreaterThan(0);
  });
});
