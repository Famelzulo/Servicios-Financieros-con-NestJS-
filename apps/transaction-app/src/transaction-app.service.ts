import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction, TransactionDto, Account } from '../../../libs/shared/src';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionAppService {
  constructor(@InjectRepository(Transaction) private readonly transactionRepository: Repository<Transaction>, @InjectRepository(Account) private readonly accountRepository: Repository<Account>) { }

  async deposit(transactionDto: TransactionDto): Promise<Transaction> {
    const account = await this.accountRepository.findOneBy({ id: transactionDto.target_account_id })
    if (!account) throw new BadRequestException('target account doesnt exists')
    account.balance += transactionDto.amount;
    await this.accountRepository.update({ id: account.id }, { balance: account.balance });

    const transaction: Transaction = new Transaction();
    transaction.type = transactionDto.type;
    transaction.target_account_id = transactionDto.target_account_id;
    transaction.amount = transactionDto.amount;
    return this.transactionRepository.save(transaction);
  }


  async withdrawal(transactionDto: TransactionDto): Promise<Transaction> {
    const account = await this.accountRepository.findOneBy({ id: transactionDto.source_account_id })
    if (!account) throw new BadRequestException('target account doesnt exists')

    if (account.balance >= transactionDto.amount) account.balance -= transactionDto.amount;
    else throw new BadRequestException('Insufficient funds');

    await this.accountRepository.update({ id: account.id }, { balance: account.balance });

    const transaction: Transaction = new Transaction();
    transaction.type = transactionDto.type;
    transaction.source_account_id = transactionDto.source_account_id;
    transaction.amount = transactionDto.amount;
    return this.transactionRepository.save(transaction);
  }

  async transfer(transactionDto: TransactionDto): Promise<Transaction> {
    const sourceAccount = await this.accountRepository.findOneBy({ id: transactionDto.source_account_id })
    if (!sourceAccount) throw new BadRequestException('source account doesnt exists')
    const targetAccount = await this.accountRepository.findOneBy({ id: transactionDto.target_account_id })
    if (!targetAccount) throw new BadRequestException('target account doesnt exists')

    if (sourceAccount.balance >= transactionDto.amount) {
      sourceAccount.balance -= transactionDto.amount;
      targetAccount.balance += transactionDto.amount;
    } else throw new BadRequestException('Insufficient funds in source account');

    await this.accountRepository.update({ id: sourceAccount.id }, { balance: sourceAccount.balance });
    await this.accountRepository.update({ id: targetAccount.id }, { balance: targetAccount.balance });

    const transaction: Transaction = new Transaction();
    transaction.type = transactionDto.type;
    transaction.target_account_id = transactionDto.target_account_id;
    transaction.source_account_id = transactionDto.source_account_id;
    transaction.amount = transactionDto.amount;
    return this.transactionRepository.save(transaction);
  }

  getAll(): Promise<Transaction[]> {
    return this.transactionRepository.find();
  }

  find(id: number) {
    return this.transactionRepository.findBy({ source_account_id: id, target_account_id: id });
  }

}
