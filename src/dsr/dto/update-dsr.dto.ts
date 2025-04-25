import {
  IsNumber,
  IsPositive,
  IsString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class UpdateDsrDto {
  @IsNotEmpty()
  @IsNumber()
  dsrId: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  hours?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  content?: string;
}
