import React from "react";
import { ReactComponent as AllamiMuzeum } from "../../assets/icons/allamimuzeum.svg";
import { ReactComponent as AllamiKulturalisIntezet } from "../../assets/icons/allamikulturalisintezet.svg";
import { ReactComponent as Egyesulet } from "../../assets/icons/egyesulet.svg";
import { ReactComponent as EtteremKocsmaGaleria } from "../../assets/icons/etteremeskocsmagaleria.svg";
import { ReactComponent as FuggetlenKulturalisIntezmeny } from "../../assets/icons/fuggetlenkulturalisintezmeny.svg";
import { ReactComponent as KereskedelmiGaleria } from "../../assets/icons/kereskedelmigaleria.svg";
import { ReactComponent as KulturalisIntezet } from "../../assets/icons/kulturalisintezet.svg";
import { ReactComponent as NonProfitGaleria } from "../../assets/icons/nonprofitgaleria.svg";
import { ReactComponent as OktatasiIntezmeny } from "../../assets/icons/oktatasiintezmeny.svg";
import { ReactComponent as OnkormanyzatiGaleria } from "../../assets/icons/onkormanyzatigaleria.svg";
import { ReactComponent as OnkormanyzatiKulturalisKozpont } from "../../assets/icons/onkormanyzatikulturaliskozpont.svg";
import { ReactComponent as OnkormanyzatiMuzeum } from "../../assets/icons/onkormanyzatimuzeum.svg";

function renderInstituteIcon(instituteType, className = "" ) {
  switch (instituteType) {
    case 0:
      return <AllamiMuzeum className={className} />;
    case 1:
      return <AllamiKulturalisIntezet className={className} />;
    case 2:
      return <OnkormanyzatiMuzeum className={className} />;
    case 3:
      return <OnkormanyzatiKulturalisKozpont className={className} />;
    case 4:
      return <OnkormanyzatiGaleria className={className} />;
    case 5:
      return <KereskedelmiGaleria className={className} />;
    case 6:
      return <FuggetlenKulturalisIntezmeny className={className} />;
    case 7:
      return <NonProfitGaleria className={className} />;
    case 8:
      return <KulturalisIntezet className={className} />;
    case 9:
      return <Egyesulet className={className} />;
    case 10:
      return <OktatasiIntezmeny className={className} />;
    case 11:
      return <EtteremKocsmaGaleria className={className} />;
    default:
      break;
  }
}

export default renderInstituteIcon;
