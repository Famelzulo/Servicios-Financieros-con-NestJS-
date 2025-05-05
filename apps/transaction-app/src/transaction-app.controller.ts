import { Body, Controller, Get, InternalServerErrorException, Param, Post } from '@nestjs/common';
import { TransactionAppService } from './transaction-app.service';
import { TransactionDto, TransactionType } from '../../../libs/shared/src/index'; //;;'@shared/index';
import { AccountAppService } from '../../account-app/src/account-app.service';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('transaction')
@Controller('transaction')
export class TransactionAppController {
  constructor(private readonly transactionAppService: TransactionAppService,
    private readonly accountAppService: AccountAppService) { }

  @Post()
  transaction(@Body() transactionDto: TransactionDto) {
    try {
      switch (transactionDto.type) {
        case TransactionType.Deposit:
          // const account = this.accountAppService.findOne(depositDto.target_account_id)
          return this.transactionAppService.deposit(transactionDto);
        case TransactionType.WithDrawal:
          return this.transactionAppService.withdrawal(transactionDto);
        case TransactionType.Transfer:
          return this.transactionAppService.transfer(transactionDto);
      }
    } catch (error) {
      throw new InternalServerErrorException('Error durante deposito');
    }
  }


  @Get(':id')
  getTransaction(@Param('id') id: string) {
    try {
      return this.transactionAppService.find(+id);
    } catch (error) {
      throw new InternalServerErrorException('Error');
    }
  }
}
