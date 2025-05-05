import { Test, TestingModule } from '@nestjs/testing';
import { TransactionAppService } from './transaction-app.service';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { Account, Transaction, TransactionDto, testDatasetSeed } from '../../../libs/shared/src';
import { TransactionType } from '../../../libs/shared/src/dto/transaction-type';
import { AccountAppService } from '../../account-app/src/account-app.service';
import { DataSource } from 'typeorm';


describe('transactions', () => {
  jest.setTimeout(60000)
  let transactionService: TransactionAppService;
  let accoutService: AccountAppService;
  let dataSource: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          dropSchema: true,
          entities: [Account, Transaction],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Account, Transaction]),
      ],
      providers: [AccountAppService, TransactionAppService],
    }).compile();
    accoutService = module.get<AccountAppService>(AccountAppService);
    transactionService = module.get<TransactionAppService>(TransactionAppService);
    dataSource = module.get<DataSource>(getDataSourceToken());

    //Seed accounts 
    await testDatasetSeed(dataSource);
  });

  it('deposit transaction', async () => {
    const accounts = await accoutService.findAll();
    expect(accounts.at(0)).toBeInstanceOf(Account);
    const transaction: TransactionDto = {
      amount: 100,
      type: TransactionType.Deposit,
      target_account_id: accounts[0].id,
      source_account_id: 0
    }
    const depositTransaction = await transactionService.deposit(transaction)
    expect(depositTransaction).toBeInstanceOf(Transaction);
    const updatedAccount = await accoutService.findOne(accounts[0].id);
    expect(updatedAccount?.balance).toBe(200);
  }, 10000);

  it('withdrawal transaction', async () => {
    // get the first account
    const accounts = await accoutService.findAll();
    expect(accounts[0]).toBeInstanceOf(Account);
    // creates transaction
    const transaction: TransactionDto = {
      amount: 100,
      type: TransactionType.WithDrawal,
      target_account_id: 0,
      source_account_id: accounts[0].id
    }
    const depositTransaction = await transactionService.withdrawal(transaction)
    expect(depositTransaction).toBeInstanceOf(Transaction);
    const updatedAccount = await accoutService.findOne(accounts[0].id);
    expect(updatedAccount?.balance).toBe(0);
  }, 10000);


  it('transfer transaction', async () => {
    // get the two first accounts
    const accounts = await accoutService.findAll();
    expect(accounts[0]).toBeInstanceOf(Account);
    expect(accounts[1]).toBeInstanceOf(Account);

    // creates transaction
    const transaction: TransactionDto = {
      amount: 50,
      type: TransactionType.Transfer,
      target_account_id: accounts[1].id,
      source_account_id: accounts[0].id
    }
    const depositTransaction = await transactionService.transfer(transaction)
    expect(depositTransaction).toBeInstanceOf(Transaction);
    const updatedSourceAccount = await accoutService.findOne(accounts[0].id);
    const updatedTargetAccount = await accoutService.findOne(accounts[1].id);
    expect(updatedSourceAccount?.balance).toBe(50);
    expect(updatedTargetAccount?.balance).toBe(250);
  }, 10000);

});
