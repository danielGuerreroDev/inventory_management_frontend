import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import ProgressBar from "react-bootstrap/ProgressBar";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";

interface props {
  headers: [];
  isLoading: boolean;
  list: [];
  orderById: () => {};
  sort: boolean;
  sortById: boolean;
}

function DataTable({ headers, isLoading, list, orderById, sort, sortById }: props) {
  const styles = {
    sort_button: {
      marginTop: -5,
      padding: '0px 5px',
    },
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
                  <th key="id">
                    ID
                    {
                      sort &&
                      <Button
                        onClick={orderById} 
                        style={styles.sort_button}
                        variant="outline"
                      >
                        {
                          sortById
                          ? <FaSortAmountUp />
                          : <FaSortAmountDown />
                        }
                      </Button>
                    }
                  </th>
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
