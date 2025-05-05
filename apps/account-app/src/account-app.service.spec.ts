import { Test, TestingModule } from '@nestjs/testing';
import { AccountAppService } from './account-app.service';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { Account, testDatasetSeed } from '../../../libs/shared/src';
import { AccountType } from '../../../libs/shared/src/dto/account-type';
import { DataSource } from 'typeorm';


describe('findAll', () => {
  jest.setTimeout(60000)
  let service: AccountAppService;
  let dataSource: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          dropSchema: true,
          entities: [Account],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Account]),
      ],
      providers: [AccountAppService],
    }).compile();
    service = module.get<AccountAppService>(AccountAppService);
    dataSource = module.get<DataSource>(getDataSourceToken());

    // Seeds
    await testDatasetSeed(dataSource);
  });

  it('create account', async () => {
    const account = await service.createAccount({
      holder_name: 'moaddd',
      account_type: AccountType.Checking,
      document_number: 12123123,
      balance: 3232
    });
    expect(account).toBeInstanceOf(Account);
  }, 10000);

  it('create and get 1 account', async () => {
    await service.createAccount({
      holder_name: 'moaddd',
      account_type: AccountType.Checking,
      document_number: 12123123,
      balance: 3232
    });
    const account = await service.findOne(1);
    expect(account).toBeInstanceOf(Account);
  }, 10000);

  it('get multiple account', async () => {
    const accounts = await service.findAll();
    expect(accounts).toHaveLength(3);
  }, 10000);
});
