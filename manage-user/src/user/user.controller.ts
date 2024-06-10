import { Controller, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch('/problem/:id')
  async updateUserProblemToFalse(@Param('id') userId: string) {
    const { updatedUser, trueProblemCount } = await this.userService.updateUserProblemToFalse(userId);

    return { updatedUser, trueProblemCount };
  }
}
