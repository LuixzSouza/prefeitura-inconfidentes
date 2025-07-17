import { Heading_2 } from "../font/Heading_2";
import { ContainerGrid } from "../layout/ContainerGrid";
import { CardNoticedSmall } from "../ui/CardNoticedSmall";

export function S_Noticed() {
    return(
        <section>
            <ContainerGrid>
                <Heading_2 title={"Últimas Noticias"}/>
                <CardNoticedSmall img={"/images/noticeds/noticed-1.png"} text={"1º Concurso de Cafés Especiais de Inconfidentes valoriza produtores e promove a cultura local"} />
            </ContainerGrid>
        </section>
    )
}