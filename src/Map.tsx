import React, { useState } from "react";
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "./api/api";
import { useWhatChanged } from "@simbathesailor/use-what-changed";
import LinkIcon from "@material-ui/icons/Link";
import { Grid, Link } from "@material-ui/core";
import renderInstituteIcon from "./components/InstituteIcons";
import "./App.css";
import InstFilter from "./components/InstTypeFilters";
import InstituteSearch from "./components/InstituteSearch";

export interface IIntezmeny {
  nev: string;
  alapitas: number;
  megszunes: number;
  intezmenyId: string;
  leiras: string;
  tipus: number;
  latitude: number;
  longitude: number;
  link: string;
}

const Map = () => {
  const checkedValues = [0,1,2,3,4,5,6,7,8,9,10,11]
  const [instTypes, setActiveInstTypes] = useState(checkedValues)
  const [activeInstitute, setActiveInistitute] = useState<
    IIntezmeny | undefined
  >(undefined);
  const [pins, setPins] = useState([]);
  const onFilterChange = (data) => {
    const toggleArrayValue =
    instTypes.includes(data)
    ? instTypes.filter(el => el !== data)
    : [...instTypes, data]
    setActiveInstTypes(toggleArrayValue)
    console.log(data)
  }
  React.useEffect(() => {
    const fetchData = async () => {
      const result = await axios.post("/Intezmeny", {
        mukodestol: 0,
        intezmenyTipus: instTypes
      });
      
      setPins(result.data);
    };

    fetchData();
  }, [instTypes]);

  useWhatChanged([pins, activeInstitute, instTypes]);

  return (
    <React.Fragment>
      <InstituteSearch />
      <InstFilter instTypes = {instTypes} onFilterChange = {(data) => { onFilterChange(data) }} />
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
                {activeInstitute.leiras !== "" ? activeInstitute.leiras : "-"}
              </div>
            </div>
          </Popup>
        )}
      </LeafletMap>
    </React.Fragment>
  );
};

export default Map;
