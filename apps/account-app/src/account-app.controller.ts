import { Body, Controller, Get, InternalServerErrorException, NotFoundException, Param, Post } from '@nestjs/common';
import { AccountAppService } from './account-app.service';
import { CreateAccountDto } from '../../../libs/shared/src';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('account')
@Controller('account')
export class AccountAppController {
  constructor(private readonly accountAppService: AccountAppService) { }

  @Post()
  async createAccount(@Body() createAccountDto: CreateAccountDto) {
    try {
      return this.accountAppService.createAccount(createAccountDto);
    } catch (error) {
      throw new InternalServerErrorException('Error en creacion de cuenta');
    }
  }

  @Get()
  findAll() {
    try {
      return this.accountAppService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Error getting accounts');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const account = await this.accountAppService.findOne(+id);
    if (!account) {
      throw new NotFoundException(`Account with id ${id} not found`);
    }
    return account;
  }
}
