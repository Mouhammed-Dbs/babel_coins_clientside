import Link from "next/link";

export default function AboutUs() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 py-4 m-auto w-fit">About us</h1>
      <div>
        <div className="container mx-auto pb-5">
          <table className="table-auto">
            <thead>
              <tr>
                <th className="px-8 py-2">PNG</th>
                <th className="px-8 py-2">JPG</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-8 py-2">
                  <Link href="/images/logo/jpg/babelcoins-logo-64.jpg">
                    64 × 64
                  </Link>
                </td>
                <td className="border px-8 py-2">
                  <Link href="/images/logo/png/babelcoins-logo-64.png">
                    64 × 64
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="border px-8 py-2">
                  <Link href="/images/logo/jpg/babelcoins-logo-512.jpg">
                    512 × 512
                  </Link>
                </td>
                <td className="border px-8 py-2">
                  <Link href="/images/logo/png/babelcoins-logo-512.png">
                    512 × 512
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="border px-8 py-2">
                  <Link href="/images/logo/jpg/babelcoins-logo-1024.jpg">
                    1024 × 1024
                  </Link>
                </td>
                <td className="border px-8 py-2">
                  <Link href="/images/logo/png/babelcoins-logo-1024.png">
                    1024 × 1024
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
