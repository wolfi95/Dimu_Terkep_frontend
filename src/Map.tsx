import React, { useState } from "react";
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "./api/api";
import { useWhatChanged } from "@simbathesailor/use-what-changed";
import LinkIcon from "@material-ui/icons/Link";
import { Grid, Link, Divider } from "@material-ui/core";
import renderInstituteIcon from "./components/InstituteIcons";
import "./App.css";
import InstFilter from "./components/InstTypeFilters";
import InstituteSearch from "./components/InstituteSearch";
import Timeline from "./components/Timeline";
import { IIntezmeny } from "./interfaces/InstituteInterfaces"

const Map = () => {
  const initInstTypes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const borderDates = [1778, new Date().getFullYear()];
  const [instTypes, setActiveInstTypes] = useState(initInstTypes);
  const [instSearchVal, setActiveInstSearch] = useState("");
  const [timelineVal, setTimelineVal] = useState<number[]>(borderDates);
  const [activeInstitute, setActiveInistitute] = useState<
    IIntezmeny | undefined
  >(undefined);
  const [pins, setPins] = useState([]);
  const onSearchValChange = (searchVal: string) => {
    setActiveInstSearch(searchVal);
  };
  const onTimelineChange = (event: any, newValue: number | number[]) => {
    setTimelineVal(newValue as number[]);
  };
  const onFilterChange = (data: number) => {
    const toggleArrayValue = instTypes.includes(data)
      ? instTypes.filter((el) => el !== data)
      : [...instTypes, data];
    setActiveInstTypes(toggleArrayValue);
  };
  React.useEffect(() => {
    const fetchData = async () => {
      const result = await axios.post("/Intezmeny", {
        intezmenyNev: instSearchVal,
        mukodestol: timelineVal[0],
        mukodesig: timelineVal[1],
        intezmenyTipus: instTypes,
      });

      setPins(result.data);
    };

    fetchData();
  }, [instTypes, instSearchVal, timelineVal]);

  useWhatChanged([
    pins,
    activeInstitute,
    instTypes,
    instSearchVal,
    timelineVal,
  ]);

  return (
    <React.Fragment>
      <InstituteSearch
        onSearchValChange={(searchVal) => {
          onSearchValChange(searchVal);
        }}
      />
      <Timeline
        currentDates={timelineVal}
        initialDates={borderDates}
        onTimelineChange={(event, newValue) => {
          onTimelineChange(event, newValue);
        }}
      />
      <InstFilter
        instTypes={instTypes}
        onFilterChange={(data) => {
          onFilterChange(data);
        }}
      />
      <LeafletMap
        center={[47.4979, 19.0402]}
        zoom={14}
        maxZoom={50}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
      >
        <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />

        {pins.map((institute, index) => (
          <Marker
            key={index}
            position={[institute["latitude"], institute["longitude"]]}
            onClick={async () => {
              try {
                let result = await axios.get(
                  "Intezmeny/" + institute["intezmenyId"]
                );
                console.log(result);
                setActiveInistitute(result.data);
              } catch (e) {
                console.log(e);
              }
            }}
          />
        ))}

        {activeInstitute && (
          <Popup
            position={[
              activeInstitute["intezmenyHelyszinek"][0].latitude,
              activeInstitute["intezmenyHelyszinek"][0].longitude,
            ]}
            onClose={() => {
              setActiveInistitute(undefined);
            }}
          >
            <div>
              <Grid
                className="link-block"
                container
                direction="row"
                alignItems="center"
                style={{ flexWrap: "nowrap" }}
              >
                <Grid item>
                  <div className="inst-type-icon">
                    {renderInstituteIcon(activeInstitute.tipus)}
                  </div>
                </Grid>
                <Grid item>
                  <h2 style={{ marginBottom: "0px", marginTop: "0px" }}>
                    {activeInstitute.nev}
                  </h2>
                  <div
                    className="subtitle"
                    style={{ marginBottom: "0px", marginTop: "0px" }}
                  >
                    ({activeInstitute.alapitas} - {activeInstitute.megszunes})
                  </div>
                </Grid>
              </Grid>

              <Grid
                className="link-block"
                container
                direction="row"
                alignItems="center"
              >
                <Grid item>
                  <LinkIcon className="link-icon" />
                </Grid>
                <Grid item>
                  <Link
                    href={activeInstitute.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {activeInstitute.link !== "" ? activeInstitute.link : "-"}
                  </Link>
                </Grid>
              </Grid>
              <div className="instDesc">
                {activeInstitute.leiras}
                <Divider variant="middle" />
                <h3>Intézmény történelmi helyszínei</h3>
                <ul>
                  {activeInstitute.intezmenyHelyszinek
                    .sort((a, b) => (a.nyitas > b.nyitas ? -1 : 1))
                    .map((place) => (
                      <li className="previousPlaces">
                        <div>
                          <strong>{place.helyszin}</strong> ({place.nyitas} –{" "}
                          {place.koltozes})
                        </div>
                      </li>
                    ))}
                </ul>
                {activeInstitute.intezmenyVezetok.length !== 0 && (
                  <div className="instLeadersContainer">
                    <h3>Intézmény történelmi vezetői</h3>
                    <ul>
                      {activeInstitute.intezmenyVezetok
                        .sort((a, b) => (a.tol > b.tol ? -1 : 1))
                        .map((leader) => (
                          <li className="previousLeaders">
                            <div>
                              <strong>{leader.nev}</strong> ({leader.tol} –{" "}
                              {leader.ig})
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
                {activeInstitute.esemenyek.length !== 0 && (
                  <div className="instEventsContainer">
                    <h3>Intézmény eseményei</h3>
                    <ul>
                      {activeInstitute.esemenyek
                        .sort((a, b) => (a.datum > b.datum ? -1 : 1))
                        .map((event) => (
                          <li className="instEvents">
                            <div>
                              <strong>{event.nev}</strong> ({event.datum});{" "}
                              {event.szervezo}
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </Popup>
        )}
      </LeafletMap>
    </React.Fragment>
  );
};

export default Map;
