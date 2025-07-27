import { Header } from "@/components/NavBar/Header";
import { Footer } from "@/components/sections/Footer";
import { S_AcessSped } from "@/components/sections/S_AcessSpeed";
import { S_Badged } from "@/components/sections/S_Badged";
import { S_home } from "@/components/sections/S_home";
import { S_Localization } from "@/components/sections/S_Localization";
import { S_Noticed } from "@/components/sections/S_Noticed";
import { S_SocialMedia } from "@/components/sections/S_SocialMedia";
import { S_Temperature } from "@/components/sections/S_Temperature";

export default function Home() {
  return (
    <div className="relative" >
      <S_home/>
      <Header/>
      <S_Badged/>
      <S_AcessSped/>
      <S_Noticed/>
      <S_SocialMedia/>
      <S_Localization/>
      <S_Temperature/>
      <Footer/>
    </div>
  );
}
