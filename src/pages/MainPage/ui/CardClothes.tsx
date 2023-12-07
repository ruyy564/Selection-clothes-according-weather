import { Card } from 'antd';
import { FC } from 'react';
import Meta from 'antd/es/card/Meta';
import style from './style.module.less';
import { FiltredClothes } from '../hooks/useGetClothes';

type Props = {
  data: FiltredClothes[];
  title: string;
  loading: boolean;
};
export const CardClothes: FC<Props> = (props) => {
  const { data, loading, title } = props;

  return (
    data?.[0] && (
      <Card
        title={title}
        style={{ minWidth: 300 }}
        loading={loading}
        bordered={false}
        bodyStyle={{ display: 'flex', gap: 10 }}
      >
        {data[0].clothes.map((item, index) => {
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
      </Card>
    )
  );
};
