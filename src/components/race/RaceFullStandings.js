import Table from "react-bootstrap/Table";

const RaceFullStandings = (props) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Time</th>
          <th>Points gain</th>
        </tr>
      </thead>
      <tbody>
        {props.standings.map((driver) => {
          return (
            <tr key={driver.position}>
              <td>{driver.position}</td>
              <td>
                {" "}
                <a
                  href={driver.Driver.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {driver.Driver.familyName}
                </a>
              </td>
              <td>
                {driver.Time !== undefined
                  ? driver.Time.time
                  : `Retired: ${driver.status}`}
              </td>
              <td>+ {driver.points}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default RaceFullStandings;
