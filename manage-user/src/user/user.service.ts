import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async updateUserProblemToFalse(userId: string): Promise<{ updatedUser: User; trueProblemCount: number }> {
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: { problem: false },
    });

    const trueProblemCount = await this.prisma.user.count({
      where: { problem: true },
    });

    return { updatedUser, trueProblemCount };
  }
}
