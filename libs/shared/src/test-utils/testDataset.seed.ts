import { DataSource, getConnection } from 'typeorm';
import { Account } from '../entities/account.entity';
import { AccountType } from '../dto/account-type';

export const testDatasetSeed = async (dataSource: DataSource) => {
  // const connection = await getConnection();
  const entityManager = dataSource.createEntityManager();

  await entityManager.insert(Account, {
    holder_name: 'fdsfasf',
    account_type: AccountType.Checking,
    document_number: 12123123,
    balance: 100
  });


  await entityManager.insert(Account, {
    holder_name: 'mffasdfsdf',
    account_type: AccountType.Savings,
    document_number: 22123123,
    balance: 200
  });


  await entityManager.insert(Account, {
    holder_name: 'moadedsfd',
    account_type: AccountType.Checking,
    document_number: 32123123,
    balance: 300
  });
};
