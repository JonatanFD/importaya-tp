import Link from "next/link";
import ImportaYaLogo from "../icons/ImportaYaLogo";

export default function AppFooter() {
  return (
    <footer className="border-t pt-10 pb-4">
      <section className="max-w-7xl mx-auto">
        <section className="flex justify-between">
          <div>
            <ImportaYaLogo className="size-14" />
            <h2 className="text-2xl font-roboto font-bold">ImportaYa</h2>
          </div>

          <nav className="flex gap-8">
            <div className="font-mono">
              <h3 className="font-semibold">Home</h3>

              <ul className="mt-4 flex flex-col gap-4">
                <li>
                  <Link href="/">Catalog</Link>
                </li>
                <li>
                  <Link href="/">News</Link>
                </li>
              </ul>
            </div>

            <div className="font-mono">
              <h3 className="font-semibold">Social</h3>

              <ul className="mt-4 flex flex-col gap-4">
                <li>
                  <Link href="/">Instagram</Link>
                </li>
                <li>
                  <Link href="/">Facebook</Link>
                </li>
                <li>
                  <Link href="/">Twitter</Link>
                </li>
              </ul>
            </div>
          </nav>
        </section>

        <p className="text-center font-mono mt-10">
          &copy; {new Date().getFullYear()} ImportaYa
        </p>
      </section>
    </footer>
  );
}
