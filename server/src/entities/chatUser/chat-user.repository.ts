import { EntityRepository, Repository } from 'typeorm';
import ChatsUserEntity from './chat-user.entity';

@EntityRepository(ChatsUserEntity)
export class ChatUserRepository extends Repository<ChatsUserEntity> {}
