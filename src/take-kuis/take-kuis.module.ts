import { Module } from '@nestjs/common';
import { TakeKuisService } from './take-kuis.service';
import { TakeKuisController } from './take-kuis.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [TakeKuisController],
  providers: [TakeKuisService, PrismaService],
})
export class TakeKuisModule {}
