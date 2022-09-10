import React, { useState } from "react";
import RaceConstructors from "./RaceConstructors";
import RaceFullStandings from "./RaceFullStandings";
import style from "./RaceResult.module.scss";
// Boostrap
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import RaceChampionship from "./RaceChampionship";

const RaceResult = (props) => {
  // Bootstrap modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // Bootstrap modal end

  return (
    <div className="card-body">
      <h4 className="mb-3">Race Result</h4>
      <div>
        {props.result.slice(0, 3).map((driver) => {
          return (
            <div className={style.result_podiumFinisher} key={driver.position}>
              <div>
                {driver.position}:{" "}
                <a
                  href={driver.Driver.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {driver.Driver.familyName}
                </a>
              </div>
              <div className={style.result_time}>{driver.Time.time}</div>
            </div>
          );
        })}
        <p
          className={`${style.result_fullResult} mb-0 mt-3`}
          variant="primary"
          onClick={handleShow}
        >
          Full standings
        </p>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.raceName} result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            defaultActiveKey="race"
            id="justify-tab-example"
            className="mb-3 flex-nowrap"
            justify
          >
            {/* Full race standings */}
            <Tab eventKey="race" title="Race">
              <div className={style["result--tableWrapper"]}>
                <RaceFullStandings standings={props.result} />
              </div>
            </Tab>
            {/* Championship after race */}
            <Tab eventKey="championship" title="Championship">
              <div className={style["result--tableWrapper"]}>
                <RaceChampionship standings={props.championship} />
              </div>
            </Tab>
            {/* Constructors table after race */}
            <Tab eventKey="constructors" title="Constructors">
              <div className={style["result--tableWrapper"]}>
                <RaceConstructors standings={props.constructors} />
              </div>
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RaceResult;
