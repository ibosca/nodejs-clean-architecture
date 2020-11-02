import { Test } from "@nestjs/testing";
import { MockyClientRepository } from "../../../../src/Infrastructure/Repository/Client/mocky.client.repository";
import { GetClientByIdUseCase } from "../../../../src/Application/Client/getClientById.useCase";
import { ClientRepositoryInterface } from "../../../../src/Domain/Repository/Client/client.repository.interface";
import { of } from "rxjs";
import { ClientMother } from "../../Domain/client.mother";
import { Client } from "../../../../src/Domain/client";
import { HttpModule } from "@nestjs/common";
import { AccessDeniedAppError } from "../../../../src/Domain/Error/accessDenied.appError";

let getCientByIdUseCase: GetClientByIdUseCase;
let clientRepositoryMock: ClientRepositoryInterface;
let clientRepositorySpy;

describe('GetClientById', () => {

  beforeAll(async () => {

    const moduleRef = await Test.createTestingModule({
      providers: [GetClientByIdUseCase, { provide: 'ClientRepositoryInterface', useClass: MockyClientRepository }],
      imports: [HttpModule]
    }).compile();
    getCientByIdUseCase = moduleRef.get<GetClientByIdUseCase>(GetClientByIdUseCase);
    clientRepositoryMock = moduleRef.get<ClientRepositoryInterface>('ClientRepositoryInterface');
  })

  it('should return a valid client when valid client is provided', async function() {

    clientRepositorySpy = jest.spyOn(clientRepositoryMock, 'getById').mockClear().mockReturnValue(of(ClientMother.basic()).toPromise())

    const validClientId = 'a0ece5db-cd14-4f21-812f-966633e7be86';
    const client = await getCientByIdUseCase.handle(validClientId, validClientId);

    //Expect first argument of first call to be the clientId
    //Ensuring the repository class is called with the correct value.
    expect(clientRepositorySpy.mock.calls[0][0]).toBe(validClientId);

    //Ensure the use case is returning a valid client
    expect(client).toBeInstanceOf(Client);
  });

  it("should throw an exception when no valid client is returned",  function() {
    clientRepositorySpy = jest.spyOn(clientRepositoryMock, 'getById').mockClear().mockReturnValue(of(undefined).toPromise())

    const invalidClientId = 'a0ece5db-cd14-4f21-812f-966633e7be86Z';

    //Ensuring the flow is not going on if not valid client
    expect(async () =>  {
      await getCientByIdUseCase.handle(invalidClientId, invalidClientId)
    }).rejects.toThrow(AccessDeniedAppError);

    //Expect first argument of first call to be the clientId
    //Ensuring the repository class is called with the correct value.
    expect(clientRepositorySpy.mock.calls[0][0]).toBe(invalidClientId);

  });
})