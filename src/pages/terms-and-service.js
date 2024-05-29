import Head from "next/head";
import Link from "next/link";

export default function TermsAndService() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-default-50 flex flex-col justify-center items-center">
      <div className="max-w-xl mx-2 px-6 py-8 bg-white dark:bg-default-100 dark:text-gray-200 shadow-lg rounded-lg my-5">
        <h1 className="text-3xl font-bold pb-2 mb-4 text-center text-primary border-b-1 border-default-300">
          Terms of Service
        </h1>

        <div className="prose">
          <p>
            <span className="font-bold">1. Acceptance of Terms</span>
            <br />
            By using the Babelcoins website, you agree to abide by our terms and
            conditions in full. This means that when you register on the website
            or use any of our services, you agree to comply with the terms and
            conditions stated here. All users must read, understand, and agree
            to these terms before using the website or subscribing to its
            services.
          </p>
          <br />
          <p>
            <span className="font-bold">2. Content and Information</span>
            <br />
            We strive to provide accurate and reliable information about digital
            currency trading on Babelcoins, but we do not provide any express or
            implied warranties regarding the accuracy or completeness of the
            information provided on the website. This information is provided
            for educational and guidance purposes only and should not be
            construed as investment advice. Users should consult a qualified
            financial advisor before making any investment decisions.
          </p>
          <br />
          <p>
            <span className="font-bold">3. Financial Responsibility</span>
            <br />
            Babelcoins is not responsible for any financial losses incurred as a
            result of your use of the information provided on this website or
            from trading in digital currencies. Users should assess the
            financial risks associated with digital currency trading based on
            their personal objectives and financial expertise.
          </p>
          <br />
          <p>
            <span className="font-bold">4. Financial Security</span>
            <br />
            Babelcoins makes every effort to protect your financial data and
            secure your personal information, but you should also take necessary
            security measures on your part. This includes using strong passwords
            and regularly updating them, not sharing account information with
            others, and avoiding unreliable links and phishing emails.
          </p>
          <br />
          <p>
            <span className="font-bold">5. Changes to Terms</span>
            <br />
            We reserve the right to change or modify these terms and conditions
            at any time without prior notice. Any changes will be posted on this
            page, and continued use of the Babelcoins website after the posting
            of changes will be considered acceptance of those changes.
          </p>
          <br />
          <p>
            <span className="font-bold">6. Contact</span>
            <br />
            If you have any questions or inquiries about the terms of service on
            Babelcoins, please{" "}
            <Link className="text-primary hover:underline" href="/contact-us">
              contact us
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
