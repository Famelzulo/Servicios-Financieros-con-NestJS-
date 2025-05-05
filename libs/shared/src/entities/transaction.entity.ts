import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Account } from "./account.entity";

//id, type, amount, source_account_id, target_account_id,created_at.
@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'simple-enum', enum: ['deposit', 'withdrawal', 'transfer'] })
  type: string;

  @Column({ type: 'int' })
  amount: number;

  @ManyToOne(() => Account, (account) => account.id)
  // @JoinColumn({ name: 'source_account_id', referencedColumnName: 'account_id' })
  source_account_id: number;

  @ManyToOne(() => Account, (account) => account.id)
  target_account_id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
