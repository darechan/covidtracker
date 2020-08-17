export const sortData = (data) => {
    let sortedData = [...data];
    sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
    return sortedData;
  };

export const buildChartData = (data, casesType) => {
    let chartData = [];
    let lastDataPoint;
    for (let date in data.cases) {
      if (lastDataPoint) {
        let newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    }
    return chartData;
  };