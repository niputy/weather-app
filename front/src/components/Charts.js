import { useEffect, useState } from "react";
import { useFetching } from "../hooks/useFetching";
import fetch from "node-fetch";
import { baseUrl } from "../api/api";
import Loader from "../components/Loader";
import { exportMultipleChartsToPdf } from "../utils";
import Chart from "./Chart";
import { Slider } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';

export default function Charts(){
    const [data, setData] = useState([]);
    const [dateList, setDateList] = useState([]);
    const [dateCount, setDateCount] = useState(0);
    const [lineChartData, setLineChartData] = useState([]);
    const [columnChartData, setColumnChartData] = useState([]);

    const [fetchData, isLoading, error] = useFetching(async () => {
        const res = await fetch(baseUrl);
        const resJson = await res.json();
        setData(resJson.res);
        fillCharts(resJson.res);
    })

    useEffect(() => {
        if (!data.length) {
            fetchData();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const lineChartOptions = {
        title: {
          text: "Weather in Tallinn",
        },
        xAxis: {
          categories: dateList.slice(dateCount)
        },
        yAxis: {
          title: {
              text: "temp"
          }
        },
        series: [
          {
            name: "Tallinn",
            type: "line",
            data: lineChartData.slice(dateCount),
          },
        ],
      };
      
    const barChartOptions = {
        chart: {
          type: "column",
        },
        title: {
          text: "Weather in Tallinn, Helsinki & Riga",
        },
        xAxis: {
            categories: dateList.slice(dateCount)
          },
        series: columnChartData
      };

    return (
        <div>
            {error && <h1>{error}</h1>}
            {isLoading ? <Loader /> :
            <>
                <button className="btn" onClick={exportMultipleChartsToPdf}>Download PDF</button>
                <div className="slider">
                    Filter Dates!
                    <Slider
                        progress
                        rev
                        defaultValue={0}
                        min={0}
                        max={6}
                        onChangeCommitted={value => {
                            setDateCount(value);
                            getColumnChartData(value);
                        }}
                    />
                </div>
                <Chart chartOptions={lineChartOptions} />
                <Chart chartOptions={barChartOptions} />
            </>}
        </div>
    )

    function fillCharts(res) {
        const talRecords = res.filter((r) => r[2] === 'Tallinn');
        const lineData = [];
        const dateSet = [];

        talRecords.forEach(rec => {
            lineData.push(rec[1]);
            dateSet.push(rec[3]);
        });
        setLineChartData(lineData);
        setDateList(dateSet);
        getColumnChartData();
    }

    function getColumnChartData(value) {
        const count = value ?? 0;
        const talRecords = data.filter((r) => r[2] === 'Tallinn');
        const helRecords = data.filter((r) => r[2] === 'Helsinki').map((r) => r[1]);
        const rigaRecords = data.filter((r) => r[2] === 'Riga').map((r) => r[1]);
        const columnData = [
            {
                name: "Tallinn",
                data: talRecords.map((r) => r[1]).slice(count),
            },
            {
                name: "Helsinki",
                data: helRecords.slice(count),
            },
            {
                name: "Riga",
                data: rigaRecords.slice(count),
            },
        ];
        setColumnChartData(columnData);
    }
}