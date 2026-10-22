import Link from "next/link";

// Link para documentos oficiais. Quando o arquivo ainda não foi publicado
// (url "#"), exibe o item desabilitado com o selo "Em breve".
export function DocumentoLink({ url, className, children }) {
  if (!url || url === "#") {
    return (
      <span className={`${className} cursor-not-allowed opacity-60`} aria-disabled="true" title="Documento ainda não disponível">
        {children}
        <span className="ml-auto shrink-0 rounded-full bg-gray-200 px-2 py-0.5 text-xs font-semibold text-gray-600">Em breve</span>
      </span>
    );
  }
  if (url.startsWith("http")) {
    return <a href={url} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>;
  }
  return <Link href={url} className={className}>{children}</Link>;
}
