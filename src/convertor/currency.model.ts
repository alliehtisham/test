import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'conversions',
  timestamps: true,
  paranoid: true, // enables soft delete (if you use DeletedAt)
})
export class Conversion extends Model<Conversion> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number; // ✅ use 'declare' to avoid overriding Model property

  @AllowNull(false)
  @Column({ type: DataType.STRING(10), field: 'from_currency' })
  declare fromCurrency: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING(10), field: 'to_currency' })
  declare toCurrency: string;

  @AllowNull(false)
  @Column({ type: DataType.DECIMAL(18, 6) })
  declare amount: number;

  @AllowNull(false)
  @Column({ type: DataType.DECIMAL(18, 6) })
  declare result: number;

  @AllowNull(false)
  @Column({ type: DataType.DECIMAL(18, 6) })
  declare rate: number;

  @AllowNull(true)
  @Column({ type: DataType.DATE, field: 'conversion_date' })
  declare conversionDate: Date | null;

  @CreatedAt
  @Column({ type: DataType.DATE, field: 'created_at' })
  declare readonly createdAt: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE, field: 'updated_at' })
  declare readonly updatedAt: Date;

  @DeletedAt
  @Column({ field: 'deleted_at', type: DataType.DATE })
  declare readonly deletedAt: Date | null;
}
