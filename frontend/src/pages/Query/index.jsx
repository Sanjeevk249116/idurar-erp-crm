import dayjs from 'dayjs';
import { useMoney, useDate } from '@/settings';
import useLanguage from '@/locale/useLanguage';
import QueryManagementTableModule from '@/modules/QueryModule';

export default function Query() {
  const translate = useLanguage();
  const { dateFormat } = useDate();
  const entity = 'query';
  const { moneyFormatter } = useMoney();

  const searchConfig = {
    entity: 'status',
    displayLabels: ['name'],
    searchFields: 'name',
  };
  const deleteModalLabels = ['customerName'];
  const dataTableColumns = [
    {
      title: translate('Customer Name'),
      dataIndex: 'customerName',
    },
    {
      title: translate('Description'),
      dataIndex: 'description',
    },
    {
      title: translate('Created Date'),
      dataIndex: 'date',
      render: (date) => {
        return dayjs(date).format(dateFormat);
      },
    },
    {
      title: translate('Status'),
      dataIndex: 'status',
    },
    {
      title: translate('Resolution'),
      dataIndex: 'resolution',
     
    }
  ];

  const Labels = {
    PANEL_TITLE: translate('query_management'),
    DATATABLE_TITLE: translate('query_management_list'),
    ADD_NEW_ENTITY: translate('add_new_query'),
    ENTITY_NAME: translate('query'),
  };
const selectOption=['Open', 'InProgress', 'Closed']

  const configPage = {
    entity,
    ...Labels,
  };
  const config = {
    ...configPage,
    dataTableColumns,
    searchConfig,
    deleteModalLabels,
    selectName:true,
    selectOption,
    default:"Open"
  };
  return <QueryManagementTableModule config={config} />;
}
