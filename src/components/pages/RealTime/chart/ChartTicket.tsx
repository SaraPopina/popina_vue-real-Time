import React, { Component } from "react";
import { Pie } from "react-chartjs-2";

interface Props {
  sumTotal: number;
  sumPayed: number;
}

class ChartTicket extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    const sumTotal = this.props.sumTotal;
    const sumPayed = this.props.sumPayed;
    const data = {
      labels: ["Non Payé", "Total"],
      datasets: [
        {
          data: [sumPayed, sumTotal],
          backgroundColor: ["#94c8f3", "#cae4fa"],
          hoverBackgroundColor: ["#94c8f3", "#cae4fa"],
        },
      ],
    };
    return (
      <div className="chart">
        {}

        <Pie data={data} />
      </div>
    );
  }
}

export default ChartTicket;
