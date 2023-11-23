import { Input } from 'antd';

const { Search } = Input;

export const SearchInput = () => {
  return (
    <Search placeholder="введите название города" allowClear enterButton="Search" size="large" onSearch={() => null} />
  );
};
