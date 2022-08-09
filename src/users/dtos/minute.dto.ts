import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsDate,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMinuteDto {
  @IsDate()
  @IsNotEmpty()
  @ApiProperty({ description: 'start Connection' })
  readonly since: Date;
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ description: 'is connected or not' })
  readonly status: boolean;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: ' Bytes Recieved' })
  readonly bytesReceived: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: ' Bytes Sent' })
  readonly bytesSent: string;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'UserId' })
  readonly userId: number;
}
// export class UpdatePizzaDto extends PartialType(CreateMinuteDto) {}
