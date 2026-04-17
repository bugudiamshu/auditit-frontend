import {useGetDashboardSummaryQuery} from '../store/dashboardApi';
import {useAppSelector} from '../store/store';

export const useDashboardData = () => {
    const query = useGetDashboardSummaryQuery();
    const {user} = useAppSelector(state => state.auth);

    const isAdmin = user?.role === 'admin';
    const metrics = query.data?.metrics;
    
    // Filter recent activity if not admin
    const filteredMetrics = metrics ? {
        ...metrics,
        recent_activity: isAdmin 
            ? metrics.recent_activity 
            : metrics.recent_activity.filter(a => a.status === 'pending')
    } : undefined;

    return {
        ...query,
        user,
        isAdmin,
        isCentralView: query.data?.view === 'central',
        tenantMetrics: filteredMetrics,
        centralSummary: query.data?.summary,
    };
};
