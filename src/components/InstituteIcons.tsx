import React from "react";
import { ReactComponent as AllamiMuzeum } from "../assets/icons/allamimuzeum.svg";
import { ReactComponent as AllamiKulturalisIntezet } from "../assets/icons/allamikulturalisintezet.svg";
import { ReactComponent as Egyesulet } from "../assets/icons/egyesulet.svg";
import { ReactComponent as EtteremKocsmaGaleria } from "../assets/icons/etteremeskocsmagaleria.svg";
import { ReactComponent as FuggetlenKulturalisIntezmeny } from "../assets/icons/fuggetlenkulturalisintezmeny.svg";
import { ReactComponent as KereskedelmiGaleria } from "../assets/icons/kereskedelmigaleria.svg";
import { ReactComponent as KulturalisIntezet } from "../assets/icons/kulturalisintezet.svg";
import { ReactComponent as NonProfitGaleria } from "../assets/icons/nonprofitgaleria.svg";
import { ReactComponent as OktatasiIntezmeny } from "../assets/icons/oktatasiintezmeny.svg";
import { ReactComponent as OnkormanyzatiGaleria } from "../assets/icons/onkormanyzatigaleria.svg";
import { ReactComponent as OnkormanyzatiKulturalisKozpont } from "../assets/icons/onkormanyzatikulturaliskozpont.svg";
import { ReactComponent as OnkormanyzatiMuzeum } from "../assets/icons/onkormanyzatimuzeum.svg";

function renderInstituteIcon(instituteType) {
  switch (instituteType) {
    case 0:
      return <AllamiMuzeum />;
    case 1:
      return <AllamiKulturalisIntezet />;
    case 2:
      return <OnkormanyzatiMuzeum />;
    case 3:
      return <OnkormanyzatiKulturalisKozpont />;
    case 4:
      return <OnkormanyzatiGaleria />;
    case 5:
      return <KereskedelmiGaleria />;
    case 6:
      return <FuggetlenKulturalisIntezmeny />;
    case 7:
      return <NonProfitGaleria />;
    case 8:
      return <KulturalisIntezet />;
    case 9:
      return <Egyesulet />;
    case 10:
      return <OktatasiIntezmeny />;
    case 11:
      return <EtteremKocsmaGaleria />;
    default:
      break;
  }
}

export default renderInstituteIcon;
