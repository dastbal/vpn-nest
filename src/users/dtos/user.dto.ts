import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: ' The Name of the user' })
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: ' The Last Name of the user' })
  readonly lastName: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: ' Name of the file of the user' })
  readonly commonName: string;
}
// export class UpdatePizzaDto extends PartialType(CreateUserDto) {}
