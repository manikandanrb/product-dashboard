import Highcharts, { Options } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";

if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
}

const PieChart = (props: {
  data: {
    name: string;
    y: number;
  }[];
}) => {
  const { data } = props;

  const chartOptions: Options = {
    chart: {
      type: "pie",
    },
    title: {
      align: "left",
      text: "All Category",
    },
    tooltip: {
      valueSuffix: "%",
    },
    plotOptions: {
      series: {
        allowPointSelect: true,
        cursor: "pointer",
      },
    },
    series: [
      {
        type: "pie",
        name: "Percentage",
        data: data,
      },
    ],
  };
  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export { PieChart };
