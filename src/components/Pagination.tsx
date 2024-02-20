import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import { First, Last, Next, Prev } from "react-bootstrap/esm/PageItem";
import Pagination from "react-bootstrap/Pagination";
import Row from "react-bootstrap/Row";

interface props {
  currentPage: number;
  first: () => {};
  last: () => {};
  next: () => {};
  pages: [];
  prev: () => {};
}

const styles = {
  pagination: {
    marginTop: 30,
  },
};

function Paging({ currentPage, first, last, next, pages, prev }: props) {
  return (
    <Container>
      <Row>
        <Col
          className="d-flex align-items-center justify-content-center"
          style={styles.pagination}
        >
          <Pagination>
            <First onClick={first} disabled={currentPage == 1} />
            <Prev onClick={prev} disabled={currentPage == 1} />
            {pages}
            <Next onClick={next} disabled={currentPage == pages.length} />
            <Last onClick={last} disabled={currentPage == pages.length} />
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
}

export default Paging;
