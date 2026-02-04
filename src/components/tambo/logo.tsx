import Image from "next/image";

export function TamboLogo({ className }: { className?: string }) {
  return (
    <div className={`relative flex items-center ${className}`}>
      <Image
        src="/flux-logo.png"
        alt="Flux Logo"
        width={40}
        height={40}
        className="object-contain"
      />
      <span className="ml-2 font-bold text-xl tracking-tight">Flux</span>
    </div>
  );
}