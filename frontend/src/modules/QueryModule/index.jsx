import { ErpLayout } from '@/layout';
import ErpPanel from '@/modules/ErpPanelModule';

export default function QueryManagementTableModule({ config }) {
    return (
        <ErpLayout>
            <ErpPanel config={config}></ErpPanel>
        </ErpLayout>
    );
}