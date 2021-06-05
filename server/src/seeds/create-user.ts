import { Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import UserEntity from 'src/entities/user/user.entity';
import MessageEntity from 'src/entities/messages/messages.entity';
import ChatsUserEntity from 'src/entities/chatUser/chat-user.entity';
import ChannelEntity from 'src/entities/channel/channel.entity';

function timePlus(duration = 0) {
  const time = new Date('2020-11-07 07:01:43.18').getTime();

  return new Date(time + duration).toISOString();
}

export default class CreateData implements Seeder {
  public async run(_: any, connection: Connection): Promise<any> {
    const password = await bcrypt.hash('123456', 6);

    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Create users
    await connection
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values([
        {
          username: 'john',
          email: 'john@email.com',
          password,
          createAt: timePlus(),
          updatedAt: timePlus(),
        },
        {
          username: 'jane',
          email: 'jane@email.com',
          password,
          createAt: timePlus(minute * 5),
          updatedAt: timePlus(minute * 5),
        },
        {
          username: 'hearts',
          email: 'hearts@email.com',
          password,
          createAt: timePlus(minute * 5),
          updatedAt: timePlus(minute * 5),
        },
      ])
      .execute();

    const john = await UserEntity.findOne({ username: 'john' });
    const jane = await UserEntity.findOne({ username: 'jane' });
    const hearts = await UserEntity.findOne({ username: 'hearts' });

    await connection
      .createQueryBuilder()
      .insert()
      .into(ChannelEntity)
      .values([
        {
          type: 'dual',
        },
        {
          type: 'dual',
        },
      ])
      .execute();

    const channel1 = await ChannelEntity.findOne({ id: 1 });
    const channel2 = await ChannelEntity.findOne({ id: 2 });

    await connection
      .createQueryBuilder()
      .insert()
      .into(ChatsUserEntity)
      .values([
        {
          channelId: channel1.id,
          userId: john.id,
        },
        {
          channelId: channel1.id,
          userId: jane.id,
        },
        {
          channelId: channel2.id,
          userId: john.id,
        },
        {
          channelId: channel2.id,
          userId: hearts.id,
        },
      ])
      .execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into(MessageEntity)
      .values([
        {
          type: 'dual',
          message: 'Hello friend',
          channelId: channel1.id,
          fromUserId: john.id,
        },
        {
          type: 'dual',
          message: 'Hi buddy',
          channelId: channel1.id,
          fromUserId: jane.id,
        },
        {
          type: 'dual',
          message: 'Long time no speak',
          channelId: channel1.id,
          fromUserId: jane.id,
        },
        {
          type: 'dual',
          message: 'Yooo',
          channelId: channel2.id,
          fromUserId: john.id,
        },
        {
          type: 'dual',
          message: 'Sup my dud',
          channelId: channel2.id,
          fromUserId: hearts.id,
        },
      ])
      .execute();
  }
}
