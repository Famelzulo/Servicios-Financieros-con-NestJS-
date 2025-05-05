import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AccountAppController } from './account-app.controller';
import { AccountAppService } from './account-app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account, LoggerMiddleware, Transaction } from '../../../libs/shared/src';
// import { Account, LoggerMiddleware, Transaction } from '@shared/index';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),  //5432,
      password: process.env.DB_PASSWORD || 'root', // 'root',
      username: process.env.DB_USER || 'root', //  'root',
      entities: [Account, Transaction],
      database: process.env.DB_NAME || 'fameltest',//  'fameltest',
      synchronize: true,
      // logging: true,
    }),
    TypeOrmModule.forFeature([Account, Transaction]),
    AccountAppModule,
  ],
  controllers: [AccountAppController],
  providers: [AccountAppService],
})
export class AccountAppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}

