export const useChartConfig = () => {
  const getBaseChartOptions = () => ({
    chart: {
      toolbar: {
        show: true,
      },
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    tooltip: {
      theme: 'light',
      shared: true,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
    },
    colors: ['#4CAF50', '#FFC107', '#2196f3'],
  })

  const createLineChartOptions = (
    xAxisTitle: string,
    yAxisTitle: string,
    yAxisMin = 0,
    yAxisMax = 100,
    formatter?: (val: number) => string,
  ) => ({
    ...getBaseChartOptions(),
    chart: {
      ...getBaseChartOptions().chart,
      type: 'line',
    },
    xaxis: {
      title: {
        text: xAxisTitle,
      },
      categories: [] as string[],
    },
    yaxis: {
      title: {
        text: yAxisTitle,
      },
      min: yAxisMin,
      max: yAxisMax,
    },
    tooltip: {
      ...getBaseChartOptions().tooltip,
      y: {
        formatter: formatter || ((val: number) => val.toString()),
      },
    },
  })

  return {
    getBaseChartOptions,
    createLineChartOptions,
  }
}
