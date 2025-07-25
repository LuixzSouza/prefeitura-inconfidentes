import { twMerge } from "tailwind-merge"

export function ContainerGrid({ children, className = "" }) {
    const defaultClass = "w-full max-w-grid mx-auto px-4";
    const combinedClasses = twMerge(defaultClass, className)
    return (
        <div className={combinedClasses}  >
            {children}
        </div>
    )
}