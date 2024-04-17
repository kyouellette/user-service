import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserEntity } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { WalletModule } from '../wallet/wallet.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), WalletModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
