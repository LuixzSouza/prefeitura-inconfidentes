import { Heading_2 } from "../font/Heading_2";
import { ContainerGrid } from "../layout/ContainerGrid";
import { CardNoticedLarge } from "../ui/CardNoticedLarge";
import { CardNoticedMedium } from "../ui/CardNoticedMedium";
import { CardNoticedSmall } from "../ui/CardNoticedSmall";

export function S_Noticed() {
    return(
        <section>
            <ContainerGrid>
                <Heading_2 title={"Últimas Noticias"}/>
                <div className="flex gap-6 py-28" >
                    <div className="w-full flex flex-col gap-8" >
                        <CardNoticedLarge  img={"https://inconfidentes.mg.gov.br/wp-content/uploads/2025/06/NOTA-DE-ALERTA-14-pdf.jpg"} title={"Prefeitura de Inconfidentes abre vaga para Fonoaudiólogo(a)"} text={"A Prefeitura Municipal de Inconfidentes, por meio da Secretaria Municipal de Saúde, está em busca de profissionais com formação em…"} date={"25 de JUNHO 2025"} type={"Saúde"} />
                        <div className="flex gap-6" >
                            <CardNoticedMedium img={"https://inconfidentes.mg.gov.br/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-25-at-14.59.18.jpeg"} title={"Prefeitura de Inconfidentes publica edital para concessão da Lanchonete da Rodoviária"} text={"A Prefeitura Municipal de Inconfidentes informa que está aberto o Edital de Concorrência Pública nº 001/2025, referente à concessão onerosa…"} date={"25 de JUNHO 2025"} type={"Saúde"} />
                            <CardNoticedMedium img={"https://inconfidentes.mg.gov.br/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-25-at-14.59.08.jpeg"} title={"Prefeitura de Inconfidentes abre edital para concessão da Lanchonete da Cancha de Bocha"} text={"A Prefeitura Municipal de Inconfidentes informa que está aberto o Edital de Concorrência Pública nº 001/2025, referente à concessão onerosa…"} date={"25 de JUNHO 2025"} type={"Saúde"} />
                        </div>
                    </div>
                    <div className="w-full max-w-96 flex flex-col items-center justify-between" >
                        <CardNoticedSmall img={"/images/noticeds/noticed-1.png"} text={"1º Concurso de Cafés Especiais de Inconfidentes valoriza produtores e promove a cultura local"} />
                        <CardNoticedSmall img={"https://inconfidentes.mg.gov.br/wp-content/uploads/2025/06/NOTA-DE-ALERTA-12-pdf-1024x576.jpg"} text={"1ª Tratorada de Inconfidentes é um sucesso e marca história no agronegócio local"} />
                        <CardNoticedSmall img={"https://inconfidentes.mg.gov.br/wp-content/uploads/2025/06/NOTA-DE-ALERTA-pdf-1024x576.jpg"} text={"IPTU 2025 vence em 10 de julho! Contribua com o desenvolvimento de Inconfidentes"} />
                        <CardNoticedSmall img={"https://inconfidentes.mg.gov.br/wp-content/uploads/2025/06/NOTA-DE-ALERTA-11-pdf-1024x576.jpg"} text={"Save the Date: 1º Seminário de Empreendedorismo e Inovação acontece em Inconfidentes no dia 1º de julho"} />
                    </div>
                </div>
            </ContainerGrid>
        </section>
    )
}