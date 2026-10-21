import { Link } from "react-router-dom";
import Photo from "../ui/Photo";
import Logo from "../layout/Logo";

export default function AuthLayout({ image, imageAlt, quote, attribution, children }) {
  return (
    <div className="min-h-[100svh] bg-paper lg:grid lg:grid-cols-2">
      <aside className="relative hidden min-h-[100svh] lg:block">
        <Photo src={image} alt={imageAlt} priority className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/35 to-ink/10" />
        <div className="absolute inset-x-0 bottom-0 p-10 text-cream xl:p-14">
          <p className="max-w-md font-display text-3xl leading-snug xl:text-4xl">“{quote}”</p>
          <p className="mt-4 text-sm tracking-wide text-sand">{attribution}</p>
        </div>
      </aside>
      <div className="flex min-h-[100svh] flex-col">
        <div className="relative h-44 sm:h-56 lg:hidden">
          <Photo src={image} alt={imageAlt} priority className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/20 to-ink/20" />
        </div>
        <div className="flex flex-1 flex-col px-4 pb-10 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex items-center justify-between py-5">
            <Logo />
            <Link to="/" className="text-sm text-muted transition hover:text-ink">
              Back to site
            </Link>
          </div>
          <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-4 lg:py-10">{children}</div>
        </div>
      </div>
    </div>
  );
}
