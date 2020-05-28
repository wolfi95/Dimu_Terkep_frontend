import { Icon } from "leaflet";

function renderMarker(instituteType) {
    let iconPath = ""
    switch (instituteType) {
        case 0:
          iconPath = "allami.svg"
          break;
        case 1:
          iconPath = "allamkult.svg"
          break;
        case 2:
          iconPath = "onkor.svg"
          break;
        case 3:
          iconPath = "onkorkult.svg"
          break;
        case 4:
          iconPath = "onkorgal.svg"
          break;
        case 5:
          iconPath = "keresk.svg"
          break;
        case 6:
          iconPath = "fuggetlen.svg"
          break;
        case 7:
          iconPath = "nonprofit.svg"
          break;
        case 8:
          iconPath = "kulturalis.svg"
          break;
        case 9:
          iconPath = "egyesulet.svg"
          break;
        case 10:
          iconPath = "oktatasi.svg"
          break;
        case 11:
          iconPath = "etterem.svg"
          break;
        default:
          iconPath = "default.svg"
          break;
    }
    let markerIcon = new Icon ({
        iconUrl: process.env.PUBLIC_URL + "/assets/markers/" + iconPath,
        iconSize: [36, 41],
        iconAnchor: [17, 41],
        popupAnchor: [0, 15]

      });
    return markerIcon;
}

export default renderMarker