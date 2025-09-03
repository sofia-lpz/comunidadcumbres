// ui/LogoComponent.tsx
import React from "react";
import Image from "next/image";
import { optiSusan } from "@/fonts/optiSusan";

type Props = {
  variant?: "yellow" | "comunidad";
  size?: number;
  className?: string;
  showText?: boolean;
  titleClassName?: string;
  subtitleClassName?: string;
  alt?: string;
};

const LogoComponent: React.FC<Props> = ({
  variant = "yellow",
  size = 48,
  className = "",
  showText = true,
  titleClassName = "",
  subtitleClassName = "",
  alt = "Comunidad Cumbres Logo",
}) => {
  const logoSrc = variant === "yellow" ? "/LOGO.png" : "/LOGO_COMUNIDAD.png";

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <Image src={logoSrc} alt={alt} width={size} height={size} priority />

      {showText && (
        <div className="flex flex-col leading-[0.95]">
          <span
            className={`${optiSusan.className} font-bold tracking-[0.03em] ${titleClassName}`}
          >
            COMUNIDAD
          </span>
          <span
            className={`${optiSusan.className} tracking-[0.02em] ${subtitleClassName}`}
          >
            CUMBRES
          </span>
        </div>
      )}
    </div>
  );
};

export default LogoComponent;
