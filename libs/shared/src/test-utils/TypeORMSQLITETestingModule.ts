import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../entities/account.entity';

export const TypeOrmSQLITETestingModule = () => [
  TypeOrmModule.forRoot({
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: true,
    entities: [Account],
    synchronize: true,
  }),
  TypeOrmModule.forFeature([Account]),
];
