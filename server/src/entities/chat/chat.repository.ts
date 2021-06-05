import { EntityRepository, Repository } from 'typeorm';
import ChatsEntity from './chat.entity';

@EntityRepository(ChatsEntity)
export class ChatsRepository extends Repository<ChatsEntity> {}
