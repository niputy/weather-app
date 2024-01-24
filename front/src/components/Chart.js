import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";


export default function Chart({ chartOptions }) {
  return (
    <div className="custom-chart">
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        containerProps={{ style: { height: "100%" } }}
      />
    </div>
  );
}