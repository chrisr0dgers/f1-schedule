import Table from "react-bootstrap/Table";

const RaceChampionship = (props) => {

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
        {props.standings.map((driver) => {
          return (
            <tr key={driver.position}>
              <td>{driver.position}</td>
              <td>{driver.Driver.familyName}</td>
              <td>{driver.points}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default RaceChampionship;
