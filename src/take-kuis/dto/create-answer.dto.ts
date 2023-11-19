import { ApiProperty } from '@nestjs/swagger';

import { IsString, IsNotEmpty, IsDefined } from 'class-validator';

export class CreateAnswerDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty({
    description: 'Answer from user. Send A, B, C, or D',
    example: 'John Doe',
  })
  jawaban: string;
}
