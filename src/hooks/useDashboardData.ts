import {useGetDashboardSummaryQuery} from '../store/dashboardApi';
import {useAppSelector} from '../store/store';

export const useDashboardData = () => {
    const query = useGetDashboardSummaryQuery();
    const {user} = useAppSelector(state => state.auth);

    return {
        ...query,
        user,
        isCentralView: query.data?.view === 'central',
        tenantMetrics: query.data?.metrics,
        centralSummary: query.data?.summary,
    };
};
