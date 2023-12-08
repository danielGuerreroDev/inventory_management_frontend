import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";

function DataTable() {
  const styles = {
    table_height: {
      height: 400,
      overflowY: "auto"
    }
  }

  return(
    <Container>
      <Row style={styles.table_height}>
        <Col>
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                {Array.from({ length: 12 }).map((_, index) => (
                  <th key={index}>Table heading</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 12 }).map((_, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  {Array.from({ length: 12}).map((_, index) => (
                    <td key={index}>Table cell {index}</td>
                  ))}              
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default DataTable;