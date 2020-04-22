import React, { useState } from 'react'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import instituteData from "./data/intezmenyek.json";

export interface IIntezmeny {
    intezmenyId: string;
    intezmenyTipus: number;
    latitude: number;
    longitude: number;
}

function Map() {
    const [activeInstitute, setActiveInistitute] = useState<IIntezmeny | undefined>(undefined)
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
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />

        {instituteData.map(institute => (
            <Marker
            key={institute["intezmenyID"]}
            position={[
                institute.latitude,
                institute.longitude
            ]}
            onClick={() => {
                setActiveInistitute(institute)
            }}
            />
        ))}

        {activeInstitute && (
        <Popup
          position={[
            activeInstitute.latitude,
            activeInstitute.longitude
          ]}
          onClose={() => {
            setActiveInistitute(undefined);
          }}
        >
            {console.log(activeInstitute)}
          <div>
            <h2>{activeInstitute.intezmenyId}</h2>
            <p>{activeInstitute.intezmenyTipus}</p>
          </div>
        </Popup>
      )}
      </LeafletMap>
    )
}

export default Map;