"use client";

interface HealthGaugeProps {
  title: string;
  value: number;
  max?: number;
  unit?: string;
  color?: 'green' | 'yellow' | 'red' | 'blue' | 'purple';
  size?: 'sm' | 'md' | 'lg';
}

export function HealthGauge({
  title,
  value,
  max = 100,
  unit = '',
  color = 'blue',
  size = 'md'
}: HealthGaugeProps) {
  const percentage = Math.min((value / max) * 100, 100);

  const colorClasses = {
    green: 'text-green-600 bg-green-100 border-green-200',
    yellow: 'text-yellow-600 bg-yellow-100 border-yellow-200',
    red: 'text-red-600 bg-red-100 border-red-200',
    blue: 'text-blue-600 bg-blue-100 border-blue-200',
    purple: 'text-purple-600 bg-purple-100 border-purple-200'
  };

  const progressColors = {
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500'
  };

  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };

  const textSizes = {
    sm: { title: 'text-xs', value: 'text-lg', unit: 'text-xs' },
    md: { title: 'text-sm', value: 'text-2xl', unit: 'text-sm' },
    lg: { title: 'text-base', value: 'text-3xl', unit: 'text-base' }
  };

  const formatValue = (val: number) => {
    if (val === undefined || val === null) return "0";
    if (val >= 1000000) {
      return `${(val / 1000000).toFixed(1)}M`;
    }
    if (val >= 1000) {
      return `${(val / 1000).toFixed(1)}k`;
    }
    return val.toString();
  };

  return (
    <div className={`
      border rounded-lg ${colorClasses[color]} ${sizeClasses[size]}
      transition-all duration-200 
    `}>
      <div className="text-center">
        <h3 className={`font-medium ${textSizes[size].title} mb-2`}>
          {title}
        </h3>

        <div className="flex items-baseline justify-center gap-1 mb-3">
          <span className={`font-bold ${textSizes[size].value}`}>
            {formatValue(value)}
          </span>
          {unit && (
            <span className={`${textSizes[size].unit} opacity-75`}>
              {unit}
            </span>
          )}
        </div>

        {max > 0 && (
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${progressColors[color]}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        )}

        {max > 0 && (
          <div className="flex justify-between text-xs opacity-60 mt-1">
            <span>0</span>
            <span>{formatValue(max)}</span>
          </div>
        )}
      </div>
    </div>
  );
}

interface HealthDashboardProps {
  metrics: {
    total_issues: number;
    open_issues: number;
    closed_issues: number;
    total_prs: number;
    open_prs: number;
    merged_prs: number;

    active_contributors: number;
    activity_score: number;
  };
}

export function HealthDashboard({ metrics }: HealthDashboardProps) {
  const getHealthColor = (score: number): 'green' | 'yellow' | 'red' => {
    if (score >= 70) return 'green';
    if (score >= 40) return 'yellow';
    return 'red';
  };

  const issueResolutionRate = metrics.total_issues > 0
    ? (metrics.closed_issues / metrics.total_issues) * 100
    : 0;

  const prMergeRate = metrics.total_prs > 0
    ? (metrics.merged_prs / metrics.total_prs) * 100
    : 0;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      <HealthGauge
        title="Activity Score"
        value={metrics.activity_score}
        max={100}
        unit="%"
        color={getHealthColor(metrics.activity_score)}
      />

      <HealthGauge
        title="Open Issues"
        value={metrics.open_issues}
        color={metrics.open_issues > 50 ? 'red' : metrics.open_issues > 20 ? 'yellow' : 'green'}
      />

      <HealthGauge
        title="Open PRs"
        value={metrics.open_prs}
        color={metrics.open_prs > 20 ? 'red' : metrics.open_prs > 10 ? 'yellow' : 'green'}
      />

      <HealthGauge
        title="Issue Resolution"
        value={issueResolutionRate}
        max={100}
        unit="%"
        color={getHealthColor(issueResolutionRate)}
      />

      <HealthGauge
        title="PR Merge Rate"
        value={prMergeRate}
        max={100}
        unit="%"
        color={getHealthColor(prMergeRate)}
      />

      <HealthGauge
        title="Contributors"
        value={metrics.active_contributors}
        color="blue"
      />
    </div>
  );
}