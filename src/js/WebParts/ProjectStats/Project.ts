import ProjectStatsChartDataItem from './ProjectStatsChart/ProjectStatsChartDataItem'

export default class Project extends ProjectStatsChartDataItem {
    constructor(data) {
        super(data.SiteTitle, data)
    }
}
