import { useEffect, useState } from "react";
import Axios from "axios";
import { backend_address } from "../urls";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";
import Row from "react-bootstrap/Row";
import {
  Bar,
  BarChart,
  Label,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { green } from "../general/colors";

function Insights() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = () => {
    Axios.get(`${backend_address}/getProducts`).then((res) => {
      setData(res.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const styles = {
    chart_container: {
      height: 400,
    },
  };

  const dataChart = data?.map((item) => ({
    title: item["title"],
    stock: item["stock"],
  }));

  return (
    <Container>
      <Row style={styles.chart_container}>
        {isLoading && <ProgressBar animated now={100} />}
        <Col className="d-flex align-items-center justify-content-center">
          <BarChart data={dataChart} height={300} width={900}>
            <XAxis 
              dataKey="title"
              tick={false}
            >
              <Label value="Product" offset={0} position="insideBottom" />
            </XAxis>
            <YAxis
              label={{
                value: "Amount",
                angle: -90,
                position: "insideLeft",
                textAnchor: "middle",
              }}
            />
            <Tooltip />
            <Bar dataKey="stock" fill={green} />
          </BarChart>
        </Col>
      </Row>
    </Container>
  );
}

export default Insights;
