import { HttpService } from "@nestjs/common";
import { GetClientByIdUseCase } from "../../../../src/Application/Client/getClientById.useCase";
import { MockyClientRepository } from "../../../../src/Infrastructure/Repository/Client/mocky.client.repository";
import { Client } from "../../../../src/Domain/client";


const sut = buildSubjectUnderTest();

describe('GetClientById', () => {
  it('should return a valid client', async function() {

    const validClientId = 'a0ece5db-cd14-4f21-812f-966633e7be86';

    const actual = await sut.handle(validClientId, validClientId);

    expect(actual).toBeInstanceOf(Client);
    expect(actual.getId()).toBe(validClientId)
  });
})

function buildSubjectUnderTest(): GetClientByIdUseCase {
  const httpService = new HttpService();
  const mockyClientRepo = new MockyClientRepository(httpService);
  return  new GetClientByIdUseCase(mockyClientRepo);
}