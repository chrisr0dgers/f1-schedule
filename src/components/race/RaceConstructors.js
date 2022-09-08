import Table from "react-bootstrap/Table";

const RaceConstructors = (props) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        {props.standings.map((constructor) => {
          return (
            <tr key={constructor.position}>
              <td>{constructor.position}</td>
              <td>{constructor.Constructor.name}</td>
              <td>{constructor.points}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default RaceConstructors;
