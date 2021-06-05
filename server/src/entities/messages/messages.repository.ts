import { EntityRepository, Repository } from 'typeorm';
import MessageEntity from './messages.entity';

@EntityRepository(MessageEntity)
export class MessageRepository extends Repository<MessageEntity> {}
