import { HttpService } from "@nestjs/common";
import { GetClientByIdUseCase } from "../../../../src/Application/Client/getClientById.useCase";
import { MockyClientRepository } from "../../../../src/Infrastructure/Repository/Client/mocky.client.repository";
import { Client } from "../../../../src/Domain/client";
import { NotFoundAppError } from "../../../../src/Domain/Error/notFound.appError";


const sut = buildSubjectUnderTest();

describe('INTEGRATION: GetClientById', () => {
  beforeAll(() => {
    jest.setTimeout(300000);
  });

  it('should return a valid client when valid id provided', async function() {

    const validClientId = 'a0ece5db-cd14-4f21-812f-966633e7be86';

    const actual = await sut.handle(validClientId, validClientId);

    expect(actual).toBeInstanceOf(Client);
    expect(actual.getId()).toBe(validClientId)
  });

  it('should throw a Not Found error when non-existing client id provided', function() {

    const invalidClientId = 'for sure this is not a valid client id';
    const validClientId = 'a0ece5db-cd14-4f21-812f-966633e7be86';

    expect( async() =>  {
      await sut.handle(invalidClientId, validClientId)
    }).rejects.toThrow(NotFoundAppError);

  });
})

function buildSubjectUnderTest(): GetClientByIdUseCase {
  const httpService = new HttpService();
  const mockyClientRepo = new MockyClientRepository(httpService);
  return  new GetClientByIdUseCase(mockyClientRepo);
}