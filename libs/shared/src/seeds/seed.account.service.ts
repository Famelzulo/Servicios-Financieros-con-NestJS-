import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../entities/account.entity';

@Injectable()
export class SeedAccountService {
  constructor(
    @InjectRepository(Account)
    private readonly userRepository: Repository<Account>,
  ) { }

  async run() {
    // Clear existing data
    await this.userRepository.clear();

    // Seed new data
    const users = [
      // { username: 'JohnDoe', password: 'password' },
      // { username: 'JaneDoe', password: 'password' },
    ];

    await this.userRepository.save(users);
  }
}
