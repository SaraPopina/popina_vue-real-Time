import React, { Component } from "react";
import { Pie } from "react-chartjs-2";

interface Props {
  guestPaid: number;
  totalGuest: number;
}

class ChartClient extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    const guestPaid = this.props.guestPaid;
    const totalGuest = this.props.totalGuest;
    const data = {
      labels: ["Non Payé", "Total"],
      datasets: [
        {
          data: [guestPaid, totalGuest],
          backgroundColor: ["#bd9b71", "#decab1"],
          hoverBackgroundColor: ["#bd9b71", "#decab1"],
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

export default ChartClient;
