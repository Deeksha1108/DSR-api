import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';

@Table
export class Dsr extends Model {
  @Column({ allowNull: false })
  project: string;

  @Column({ allowNull: false })
  hours: number;

  @Column({ type: 'TEXT', allowNull: false })
  content: string;

  @ForeignKey(() => User)
  @Column({ field: 'user_id' })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}