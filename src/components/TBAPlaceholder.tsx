import Link from "next/link";
import BlankPageMessage from "@/components/BlankPageMessage";
import ImageWithFallback from "@/components/ImageWithFallback";
import { workHacky } from "@/assets/images";

type TBAPlaceholderProps = {
  title: string;
  message: string;
  action?: {
    href: string;
    label: string;
  };
};

export default function TBAPlaceholder({
  title,
  message,
  action,
}: TBAPlaceholderProps) {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-12 sm:py-16">
      <div className="mx-auto w-full max-w-5xl rounded-3xl border border-sinfo-primary/10 bg-white p-8 text-center shadow-sm sm:p-12">
        <h3 className="text-2xl font-bold text-sinfo-primary">{title}</h3>

        <BlankPageMessage message={message} />

        <div className="mt-2 flex flex-col items-center">
          <ImageWithFallback
            src={workHacky}
            alt=""
            className={`pointer-events-none relative z-10 block ${
              action ? "-mb-2" : ""
            }`}
            style={{ width: 128, height: "auto" }}
            sizes="128px"
          />

          {action && (
            <Link
              href={action.href}
              className="relative z-0 inline-flex items-center justify-center rounded-md bg-sinfo-primary px-6 py-3 font-semibold text-white transition hover:opacity-95"
            >
              {action.label}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
