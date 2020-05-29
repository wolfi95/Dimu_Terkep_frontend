import React, { useState } from "react";
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "../../api/api";
import { useWhatChanged } from "@simbathesailor/use-what-changed";
import LinkIcon from "@material-ui/icons/Link";
import { Grid, Link, Divider, Button } from "@material-ui/core";
import renderInstituteIcon from "./InstituteIcons";
import "../../assets/styles/App.css";
import InstFilter from "./InstTypeFilters";
import InstituteSearch from "./InstituteSearch";
import Timeline from "./Timeline";
import RequestFailedAlert from "./RequestFailedAlert";
import { IIntezmeny } from "../../interfaces/InstituteInterfaces";
import { SearchType } from "../../enums/enums";
import { $enum } from "ts-enum-util";
import { IPosition } from "../../interfaces/PositionInterface";
import ArtlasLogo from "./ArtlasLogo";
import { appHistory } from "../../.";
import renderMarker from "./InstituteMarkers";

const Map = () => {
  const initInstTypes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const borderDates = [1778, new Date().getFullYear()];
  const initSearchType = $enum(SearchType).getKeyOrDefault(
    SearchType.IntezmenyNev
  ) as string;
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [instTypes, setActiveInstTypes] = useState(initInstTypes);
  const [searchVal, setActiveSearchVal] = useState("");
  const [searchType, setSearchType] = useState(initSearchType);
  const [timelineVal, setTimelineVal] = useState<number[]>(borderDates);
  const [activePopupPos, setPopupPos] = useState<IPosition>({
    latitude: -1,
    longitude: -1,
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [activeInstitute, setActiveInistitute] = useState<
    IIntezmeny | undefined
  >(undefined);
  const [pins, setPins] = useState([]);
  const isSearchResult = (checkValue: string, checkType: string) => {
    if (
      searchVal !== "" &&
      searchType === $enum(SearchType).getKeyOrDefault(checkType) &&
      checkValue.toLowerCase().includes(searchVal.toLowerCase())
    ) {
      return true;
    } else {
      return false;
    }
  };
  const getInstAddr = (inst: IIntezmeny) => {
    let latIdx = inst.intezmenyHelyszinek
      .map((el) => el.latitude)
      .indexOf(activePopupPos.latitude);
    let longIdx = inst.intezmenyHelyszinek
      .map((el) => el.longitude)
      .indexOf(activePopupPos.longitude);
    if (latIdx !== -1 && longIdx !== -1 && latIdx === longIdx) {
      return inst.intezmenyHelyszinek[latIdx].helyszin;
    } else {
      return "";
    }
  };
  const onSearchValChange = (searchVal: string) => {
    setActiveSearchVal(searchVal);
  };
  const onSearchTypeChange = (searchType: string) => {
    setSearchType(searchType);
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
  const onLoginClick = () => {
    appHistory.push("/login");
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoggedIn(
          localStorage.getItem("token") !== "" &&
            localStorage.getItem("token") !== null
        );
        const result = await axios.post("/Intezmeny", {
          [searchType]: searchVal,
          mukodestol: timelineVal[0],
          mukodesig: timelineVal[1],
          intezmenyTipus: instTypes,
        });
        setPins(result.data);
      } catch (error) {
        console.log(error);
        setAlertOpen(true);
      }
    };

    fetchData();
  }, [instTypes, searchVal, timelineVal, searchType]);

  useWhatChanged([pins, activeInstitute, instTypes, searchVal, timelineVal]);

  return (
    <React.Fragment>
      <RequestFailedAlert setOpen={setAlertOpen} open={alertOpen} />
      <ArtlasLogo />
      <InstituteSearch
        initSearchType={initSearchType}
        onSearchValChange={(searchVal) => {
          onSearchValChange(searchVal);
        }}
        onSearchTypeChange={(searchType) => {
          onSearchTypeChange(searchType);
        }}
      />
      {loggedIn ? (
        <div className="loginButton">
          <Button onClick={() => appHistory.push("/admin")}>Admin</Button>
        </div>
      ) : (
        <div className="loginButton">
          <Button onClick={onLoginClick}>Bejelentkezés</Button>
        </div>
      )}
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
        <TileLayer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"  attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"/>

        {pins.map((institute, index) => (
          <Marker
            icon={renderMarker(institute["intezmenyTipus"])}
            key={index}
            position={[institute["latitude"], institute["longitude"]]}
            onClick={async () => {
              try {
                let result = await axios.get(
                  "Intezmeny/" + institute["intezmenyId"]
                );
                setPopupPos({
                  latitude: institute["latitude"],
                  longitude: institute["longitude"],
                });
                setActiveInistitute(result.data);
              } catch (e) {
                console.log(e);
                setAlertOpen(true);
              }
            }}
          />
        ))}

        {activeInstitute && (
          <Popup
            position={[activePopupPos.latitude, activePopupPos.longitude]}
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

                  <div
                    className="subtitle"
                    style={{ marginBottom: "0px", marginTop: "0px" }}
                  >
                    {getInstAddr(activeInstitute)}
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
              <div className="instDetails">
                <div className="instDesc">{activeInstitute.leiras}</div>
                <Divider variant="middle" />
                <h3>Intézmény helyszínei</h3>
                <ul style={{ textAlign: "left" }}>
                  {activeInstitute.intezmenyHelyszinek
                    .sort((a, b) => (a.nyitas > b.nyitas ? -1 : 1))
                    .map((place, index) => (
                      <li
                        className={
                          "previousPlaces " +
                          (isSearchResult(
                            place.helyszin,
                            SearchType.IntezmenyCim
                          )
                            ? "highlightSearchRes"
                            : "")
                        }
                        key={index}
                      >
                        <div>
                          <strong>{place.helyszin}</strong> ({place.nyitas} –{" "}
                          {place.koltozes})
                        </div>
                      </li>
                    ))}
                </ul>
                {activeInstitute.intezmenyVezetok.length !== 0 && (
                  <div
                    className="instLeadersContainer"
                    style={{ textAlign: "left" }}
                  >
                    <h3>Intézmény vezetői</h3>
                    <ul>
                      {activeInstitute.intezmenyVezetok
                        .sort((a, b) => (a.tol > b.tol ? -1 : 1))
                        .map((leader, index) => (
                          <li
                            className={
                              "previousLeaders " +
                              (isSearchResult(
                                leader.nev,
                                SearchType.IntezmenyVezeto
                              )
                                ? "highlightSearchRes"
                                : "")
                            }
                            key={index}
                          >
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
                  <div
                    className="instEventsContainer"
                    style={{ textAlign: "left" }}
                  >
                    <h3>Intézmény eseményei</h3>
                    <ul>
                      {activeInstitute.esemenyek
                        .sort((a, b) => (a.datum > b.datum ? -1 : 1))
                        .map((event, index) => (
                          <li
                            className={
                              "instEvents " +
                              (isSearchResult(event.nev, SearchType.EsemenyNev)
                                ? "highlightSearchRes"
                                : "")
                            }
                            key={index}
                          >
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
