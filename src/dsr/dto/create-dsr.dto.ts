import { IsNumber, IsPositive, IsString, IsNotEmpty } from 'class-validator';

export class CreateDsrDto {
  @IsString()
  @IsNotEmpty()
  project: string;

  @IsNumber()
  @IsPositive()
  hours: number;

  @IsString()
  @IsNotEmpty()
  content: string;
}