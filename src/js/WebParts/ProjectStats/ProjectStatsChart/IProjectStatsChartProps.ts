import ChartConfiguration from '../ChartConfiguration'

export default interface IProjectStatsChartProps {
    chart: ChartConfiguration;
    showSettings?: boolean;
    listServerRelativeUrl?: string;
    renderCommandBar?: boolean;
}
