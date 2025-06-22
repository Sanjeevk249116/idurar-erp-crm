import { Select, Tag } from 'antd';
import { generate as uniqueId } from 'shortid';

export default function SelectTag({ options, defaultValue, onChange }) {
  return (
    <Select
      defaultValue={defaultValue}
      onChange={onChange}
      style={{
        width: '150px',
      }}
    >
      {options?.map((value) => {

        return (
          <Select.Option key={`${uniqueId()}`} value={value}>
            {value}
          </Select.Option>
        );
      })}
    </Select>
  );
}
