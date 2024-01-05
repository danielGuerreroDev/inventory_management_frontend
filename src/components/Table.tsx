import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";

interface props {
  headers: [];
  isLoading: boolean;
  list: [];
}

function DataTable({ headers, isLoading, list }: props) {
  const styles = {
    sticky_th: {
      position: "sticky",
      top: 0,
    },
    table_height: {
      height: 400,
      overflowY: "auto",
    },
  };

  return (
    <Container>
      <Row style={styles.table_height}>
        <Col>
          {isLoading ? (
            <ProgressBar animated now={100} />
          ) : (
            <Table>
              <thead style={styles.sticky_th}>
                <tr>
                  <th key="id">ID</th>
                  {headers}
                </tr>
              </thead>
              <tbody>{list}</tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default DataTable;
