import Link from "next/link";

const listNav = [
    {icon: "", linkTxt: "Pagina Inicial", linkUrl: "#"},
    {icon: "", linkTxt: "O Município", linkUrl: "#"},
    {icon: "", linkTxt: "O Governo", linkUrl: "#"},
    {icon: "", linkTxt: "Departamentos", linkUrl: "#"},
    {icon: "", linkTxt: "Publicações Oficiais", linkUrl: "#"},
    {icon: "", linkTxt: "Transparência", linkUrl: "#"},
]

export function Header() {
    return (
        <header className="sticky top-0 w-full h-12 bg-green-800" > 
            <ul>
                <li>
                    <Link href={"#"}>
                        Pagina Inicial
                    </Link>
                </li>
            </ul>
        </header>
    )
}