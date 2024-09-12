import { RecoilRoot } from 'recoil';
import { action } from '@storybook/addon-actions';
import { DataTable, Column, Filter, Order, Search } from './index';
import { Confirm } from '../Confirm';
import { transformServerData } from '../../helpers/transformServerData';
import '../../base.css';

// Mocked data
import _data from './_data.json';

export default {
    title: 'Components/DataTable',
    component: DataTable,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <RecoilRoot>
                <Story />
                <Confirm />
            </RecoilRoot>
        ),
    ],
};

export const Primary = () => {
    const { data, pagination } = transformServerData(_data);

    return (
        <DataTable
            data={data}
            pagination={pagination}
            multiple
            permissions={['view', 'edit', 'remove', 'add']}
            onItemAction={action('item-action')}
            onMultipleAction={action('multiple-action')}
            onPageChange={action('page-change')}
            onFiltersApplied={action('filters-applied')}
            onSearch={action('search')}
            onSortingChange={action('sorting-change')}
        >
            <Order field="id" order="asc" />
            <Search>test232</Search>

            <Column name="id" type="id" className="w-[100px] text-start">
                ID
            </Column>
            <Column name="code">Code</Column>
            <Column type="description" name="description">
                Description
            </Column>
            <Column type="custom" render={(value, item) => {
                return 'test' + item.id;
            }}>
                My cusotm column
            </Column>
            <Column
                type="boolean"
                name="isActive"
                className="text-center w-[150px]"
            >
                Active
            </Column>

            <Filter
                name="codeSharingMethodId"
                type="select"
                options={[
                    {
                        value: '1',
                        label: 'Code Sharee1',
                    },
                    {
                        value: '2',
                        label: 'Code Share 2',
                    },
                ]}
                placeholder="Filter by Sharing Method"
            >
                Code Sharing Method
            </Filter>

            <Filter name="isActive" type="boolean">
                Active
            </Filter>

            <Filter name="description" type="text" value="test">
                Description
            </Filter>
        </DataTable>
    );
};
