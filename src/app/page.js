import { Header } from "@/components/NavBar/Header";
import { Footer } from "@/components/sections/Footer";
import { S_AcessSped } from "@/components/sections/S_AcessSpeed";
import { S_Badged } from "@/components/sections/S_Badged";
import { S_home } from "@/components/sections/S_home";
import { S_Noticed } from "@/components/sections/S_Noticed";

export default function Home() {
  return (
    <div className="overflow-hidden" >
      <S_home/>
      <Header/>
      <S_Badged/>
      <S_AcessSped/>
      <S_Noticed/>
      <Footer/>
    </div>
  );
}
