import { Button, Card, Flex } from 'antd';
import { FC, useState } from 'react';
import Meta from 'antd/es/card/Meta';
import { getRandomNumber } from 'shared/libs/getRandomNumber';
import style from './style.module.less';
import { FiltredClothes } from '../hooks/useGetClothes';

type Props = {
  data: FiltredClothes[];
  title: string;
  loading: boolean;
};

export const CardClothes: FC<Props> = (props) => {
  const { data, loading, title } = props;

  const [random, setRandom] = useState(0);

  const reloadClothes = () => {
    setRandom(getRandomNumber(0, data.length - 1));
  };

  return (
    data?.[random] && (
      <Card
        title={title}
        style={{ minWidth: 300 }}
        loading={loading}
        bordered={false}
        bodyStyle={{ display: 'flex', gap: 10 }}
      >
        <Flex vertical gap={30}>
          <Button onClick={reloadClothes} style={{ width: 100 }}>
            Обновить
          </Button>
          <Flex gap={30}>
            {data[random].clothes.map((item, index) => {
              if (item.type === 'empty') {
                return null;
              }

              return (
                <Card
                  hoverable
                  key={index}
                  style={{ width: 240 }}
                  cover={<img src={item.img} className={style.img_clothes} />}
                >
                  <Meta title={item.name} />
                </Card>
              );
            })}
          </Flex>
        </Flex>
      </Card>
    )
  );
};
