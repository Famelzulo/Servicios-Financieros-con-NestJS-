import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account, CreateAccountDto, UpdateAccountDto } from '../../../libs/shared/src';

@Injectable()
export class AccountAppService {
  constructor(@InjectRepository(Account) private readonly accountRepository: Repository<Account>,) { }

  createAccount(createAccountDto: CreateAccountDto): Promise<Account> {
    const account: Account = new Account();
    account.holder_name = createAccountDto.holder_name;
    account.balance = createAccountDto.balance;
    account.document_number = createAccountDto.document_number;
    account.account_type = createAccountDto.account_type;
    return this.accountRepository.save(account);
  }

  findAll(): Promise<Account[]> {
    return this.accountRepository.find();
  }

  findOne(id: number) {
    return this.accountRepository.findOneBy({ id })
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    const account = await this.accountRepository.findOneOrFail({ where: { id } });
    Object.entries(updateAccountDto).forEach(([key, value]) => {
      if (value !== undefined) {
        (account as any)[key] = value;
      }
    });
    return this.accountRepository.save(account);
  }
}
