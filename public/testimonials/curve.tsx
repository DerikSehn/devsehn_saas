import { cn } from "@/lib/utils";
import { SVGProps } from "react";

const CurveIcon = ({ ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      fill="#"
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      id="curve-arrow-right-7"
      data-name="Flat Line"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("icon flat-line", props.className)}
      {...props}
    >
      <path
        id="primary"
        d="M3,18A13.17,13.17,0,0,1,15.49,9H21"
        /* style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;" */
        style={{
          fill: "none",
          stroke: "var(--jet-800)",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "2",
        }}
      ></path>
      <polyline
        id="primary-2"
        data-name="primary"
        points="18 12 21 9 18 6"
        // style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"
        style={{
          fill: "none",
          stroke: "var(--jet-800)",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "2",
        }}
      ></polyline>
    </svg>
  );
};

export default CurveIcon;