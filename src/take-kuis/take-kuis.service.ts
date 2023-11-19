import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAnswerDto } from './dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Injectable()
export class TakeKuisService {
  constructor(private readonly prisma: PrismaService) {}

  async createKuis(user_id: number, topic_id: number) {
    const kuis = await this.prisma.take_Kuis.create({
      data: {
        user_id,
        topic_id,
        status: 'In_Progress',
        tgl_pengerjaan: new Date(),
      },
    });

    return kuis;
  }

  async createAnswer(
    take_kuis_id: number,
    kuis_id: number,
    data: CreateAnswerDto,
  ) {
    const mark = await this.checkAnswers(kuis_id, data.jawaban);
    const answer = await this.prisma.detail_Take_Kuis.create({
      data: {
        take_kuis_id,
        kuis_id,
        jawaban: data.jawaban,
        mark,
      },
    });

    return answer;
  }

  async findOne(id: number) {
    const takeKui = await this.prisma.detail_Take_Kuis.findUnique({
      where: {
        id,
      },
    });

    return takeKui;
  }

  async update(id: number, data: UpdateAnswerDto) {
    const kuis_id = await this.findKuisIdFromDetailTakeKuis(id);
    const mark = await this.checkAnswers(kuis_id, data.jawaban);

    const answer = await this.prisma.detail_Take_Kuis.update({
      where: {
        id,
      },
      data: {
        jawaban: data.jawaban,
        mark,
      },
    });

    return answer;
  }

  async finish(id: number) {
    const nilai = await this.getMarkKuis(id);
    const kuis = await this.prisma.take_Kuis.update({
      where: {
        id,
      },
      data: {
        status: 'Completed',
        nilai,
      },
    });

    return kuis;
  }

  async checkAnswers(kuis_id: number, answer: string) {
    const kuis = await this.prisma.kuis.findUnique({
      where: {
        id: kuis_id,
      },
    });

    let num_answers: string;
    switch (answer) {
      case 'A':
        num_answers = '1';
        break;
      case 'B':
        num_answers = '2';
        break;
      case 'C':
        num_answers = '3';
        break;
      case 'D':
        num_answers = '4';
        break;
      default:
        num_answers = '1';
        break;
    }

    if (kuis.jawaban == num_answers) {
      return true;
    }

    return false;
  }

  async findKuisIdFromDetailTakeKuis(detail_take_kuis_id: number) {
    const detailTakeKuis = await this.prisma.detail_Take_Kuis.findUnique({
      where: {
        id: detail_take_kuis_id,
      },
    });

    return detailTakeKuis.kuis_id;
  }

  async getMarkKuis(take_kuis_id: number) {
    const detailTakeKuis = await this.prisma.detail_Take_Kuis.findMany({
      where: {
        take_kuis_id,
      },
    });

    let totalMark = 0;
    detailTakeKuis.forEach((detail) => {
      if (detail.mark) {
        totalMark += 1;
      }
    });

    const totalKuis = detailTakeKuis.length;

    const mark = (totalMark / totalKuis) * 100;

    return mark;
  }
}
