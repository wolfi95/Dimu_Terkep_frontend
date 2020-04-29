import React, { useState } from "react";
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "./api/api";
import { useWhatChanged } from '@simbathesailor/use-what-changed';
import LinkIcon from '@material-ui/icons/Link';
import { Grid, Link } from "@material-ui/core";
import "./App.css"; 

export interface IIntezmeny {
  nev: string;
  alapitas: number;
  megszunes: number;
  intezmenyId: string;
  leiras: string;
  intezmenyTipus: number;
  latitude: number;
  longitude: number;
  link: string;
}

function Map() {
  const [activeInstitute, setActiveInistitute] = useState<
    IIntezmeny | undefined
  >(undefined);
  const [pins, setPins] = useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      const result = await axios.post("/Intezmeny", {
        mukodestol: 0,
      });

      setPins(result.data);
    };

    fetchData();
  }, []);

  useWhatChanged([activeInstitute,])

  return (
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
          onClick={
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            async () => {
              try {
                let result = await axios.get("Intezmeny/" + institute['intezmenyId']);
                console.log(result)
                setActiveInistitute(result.data);
              } catch (e) {
                console.log(e);
              }
            }
          }
        />
      ))}

      {activeInstitute && (
        <Popup
          position={[activeInstitute['intezmenyHelyszinek'][0].latitude, activeInstitute['intezmenyHelyszinek'][0].longitude]}
          onClose={() => {
            setActiveInistitute(undefined);
          }}
        >
          <div>
            <h2 style={{marginBottom: "0px"}}>{activeInstitute.nev} ({activeInstitute.alapitas} - {activeInstitute.megszunes})</h2>
            <Grid className="link-block" container direction="row" alignItems="center">
              <Grid item>
                <LinkIcon className="link-icon"/>
              </Grid>
              <Grid item>
                <Link href={activeInstitute.link} target="_blank" rel="noopener noreferrer">
                {activeInstitute.link !== "" ? activeInstitute.link : '-'}
                </Link>
              </Grid>
            </Grid>
            <div className="instDesc">
              {activeInstitute.leiras !== "" ? activeInstitute.leiras : '-' }
            </div>
          </div>
        </Popup>
      )}
    </LeafletMap>
  );
}

export default Map;
