import { EntityRepository, Repository } from 'typeorm';
import ChannelEntity from './channel.entity';

@EntityRepository(ChannelEntity)
export class ChannelRepository extends Repository<ChannelEntity> {}
