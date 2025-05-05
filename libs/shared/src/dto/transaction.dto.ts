import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, isString, MinLength, ValidateIf } from "class-validator";
import { TransactionType } from "./transaction-type";
import { ApiProperty } from "@nestjs/swagger";

export class TransactionDto {
  @ApiProperty({
    example: 'deposit',
    required: true
  })
  @IsEnum(TransactionType, { message: 'El tipo de tarjeta debe ser "transfer" o "deposit" o "withdrawal"' })
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty({
    example: 1000,
    required: true
  })
  @IsInt()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    example: 1,
    required: false
  })
  @ValidateIf(o => o.type === TransactionType.Transfer || o.type === TransactionType.WithDrawal)
  @IsInt()
  @IsPositive()
  source_account_id: number;

  @ApiProperty({
    example: 1,
    required: false
  })
  @ValidateIf(o => o.type === TransactionType.Transfer || o.type === TransactionType.Deposit)
  @IsInt()
  @IsPositive()
  target_account_id: number;
}
