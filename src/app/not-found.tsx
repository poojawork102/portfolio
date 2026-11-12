import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative z-[1] grid min-h-svh place-items-center px-6 text-center">
      <div>
        <p className="label">404</p>
        <h1 className="h2">This page doesn&apos;t exist</h1>
        <p className="sub mx-auto">The link may be old or mistyped.</p>
        <Link href="/" className="pill pill-solid mt-8">Back to the portfolio</Link>
      </div>
    </main>
  );
}
