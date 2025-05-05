import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { AccountType } from './account-type';
import { ApiProperty } from '@nestjs/swagger';


export class CreateAccountDto {
  @ApiProperty({
    example: 'cachisto salas',
    required: true
  })
  @IsNotEmpty({ message: 'El titular de la tarjeta es obligatorio' })
  @IsString()
  holder_name: string;


  @ApiProperty({
    example: 23455555,
    required: true
  })
  @IsNotEmpty()
  @IsInt()
  document_number: number;


  @ApiProperty({
    example: 'savings',
    required: true
  })
  @IsNotEmpty()
  @IsEnum(AccountType, { message: 'El tipo de tarjeta debe ser "savings" o "checking"' })
  account_type: string;


  @ApiProperty({
    example: 3322,
    required: true
  })
  @IsNotEmpty()
  @IsInt()
  balance: number;
}


