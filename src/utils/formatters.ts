const currencyFormatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
});

const compactFormatter = new Intl.NumberFormat('en-IN', {
    notation: 'compact',
    maximumFractionDigits: 1,
});

export const formatCurrency = (value: number) => currencyFormatter.format(value ?? 0);

export const formatCompact = (value: number) => compactFormatter.format(value ?? 0);

export const formatRelativeTime = (value: string | null) => {
    if (!value) {
        return 'No recent activity';
    }

    const current = new Date().getTime();
    const target = new Date(value).getTime();
    const diffMinutes = Math.max(1, Math.round((current - target) / 60000));

    if (diffMinutes < 60) {
        return `${diffMinutes}m ago`;
    }

    const diffHours = Math.round(diffMinutes / 60);
    if (diffHours < 24) {
        return `${diffHours}h ago`;
    }

    return `${Math.round(diffHours / 24)}d ago`;
};

export const formatDisplayDate = (value: Date) =>
    value.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
