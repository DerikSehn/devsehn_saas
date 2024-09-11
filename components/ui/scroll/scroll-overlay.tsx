import { cn } from "@/lib/utils"

export default function ScrollOverlay({ className, fill }: { className?: string, fill?: string }) {
    return (
        <svg
            id="eNtue4My2h61"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 300 75"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            className={cn(className)}
            width="100%"
            height="100%">
            <path
                d="M150.019,124.895791c56.598658.784075,84.90748,56.479249,113.21631,56.479249h-113.21631c-.00633,0-.01266,0-.01899,0s-.01266,0-.01899,0h-113.2163c28.30882,0,56.617673-56.617658,113.254285-56.617658"
                transform="matrix(1.324675 0 0 1.324675-48.701249-165.262985)"
                fill={fill}
                strokeWidth="0" />
        </svg>
    );
}
