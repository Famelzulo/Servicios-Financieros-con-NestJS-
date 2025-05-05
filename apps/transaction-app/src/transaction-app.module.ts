import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TransactionAppController } from './transaction-app.controller';
import { TransactionAppService } from './transaction-app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account, LoggerMiddleware, Transaction } from '../../../libs/shared/src/index';//'@shared/index';
import { AccountAppModule } from '../../account-app/src/account-app.module';
import { AccountAppService } from '../../account-app/src/account-app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      password: process.env.DB_USER || 'root',
      username: process.env.DB_PASSWORD || 'root',
      entities: [Transaction, Account],
      database: process.env.DB_NAME || 'fameltest',
      synchronize: true,
      // logging: true,
    }),
    TypeOrmModule.forFeature([Transaction, Account]),
    TransactionAppModule, AccountAppModule
  ],
  controllers: [TransactionAppController],
  providers: [TransactionAppService, AccountAppService],
})
export class TransactionAppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
