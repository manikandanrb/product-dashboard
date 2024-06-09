import Highcharts, { Options } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";

if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
}

const BarChart = (props: {
  data: {
    name: string;
    y: number;
  }[];
  category: string;
}) => {
  const { data, category } = props;
  const chartOptions: Options = {
    chart: {
      type: "column",
      style: {
        fontFamily: "PT Sans, sans-serif",
      },
    },
    title: {
      align: "left",
      text: "Products in selected Category",
    },
    accessibility: {
      announceNewData: {
        enabled: true,
      },
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      title: {
        text: category,
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: "{point.y:.1f}$",
        },
      },
    },

    exporting: {
      enabled: true,
      buttons: {
        contextButton: {
          align: "right",
          enabled: true,
        },
      },
    },

    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat:
        '<span style="color:{point.color}">{point.name}</span>: ' +
        "<b>{point.y:.1f}$</b> of total<br/>",
    },

    series: [
      {
        name: category,
        type: "column",
        data,
      },
    ],
  };
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export { BarChart };
