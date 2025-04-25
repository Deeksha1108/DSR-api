import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Dsr } from 'src/dsr/entities/dsr.entity';

@Table({tableName: 'users'})
export class User extends Model {
  @Column({ allowNull: false })
  name: string;

  @Column({ unique: true, allowNull: false })
  email: string;

  @Column({ allowNull: false })
  password: string;

  @Column({ defaultValue: false })
  isVerified: boolean;

  @HasMany(() => Dsr)
  dsrs: Dsr[];
}