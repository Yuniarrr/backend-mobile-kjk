import { ApiProperty } from '@nestjs/swagger';

import { IsNumber, IsNotEmpty } from 'class-validator';

export class GetUserByIdDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Id of the user.',
    example: 'f7187c19-6206-46ed-a0d2-942585f8c510',
  })
  id: number;
}
