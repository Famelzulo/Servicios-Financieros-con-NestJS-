import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Transaction } from './transaction.entity';
/*
 * id, holder_name, document_number, account_type, balance,
created_at.
 * */
@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  holder_name: string;

  @Column({ type: 'int' })
  document_number: number;

  @Column({ type: 'simple-enum', enum: ['savings', 'checking'] })
  account_type: string;

  @Column({ type: 'int' })
  balance: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
