import { useRef } from "react";

export default function PrivacyPolicy() {
  const mainRef = useRef(null);

  return (
    <div
      className={`relative max-h-screen bg-white dark:bg-black dark:text-white text-black flex`}
    >
      <aside
        className={`hidden md:block w-64 bg-white dark:bg-default-50/45 shadow-md p-4 sticky h-screen pt-16`}
      >
        <nav>
          <ul className="flex flex-col gap-3">
            <li>
              <a
                href="#general-information"
                className={`text-primary hover:cursor-pointer hover:underline`}
              >
                General Information
              </a>
            </li>
            <li>
              <a
                href="#opening-account"
                className={`text-primary hover:underline`}
              >
                Opening of the electronic account
              </a>
            </li>
            <li>
              <a
                href="#data-profile"
                className={`text-primary hover:underline`}
              >
                Data and profile
              </a>
            </li>
            <li>
              <a
                href="#account-security"
                className={`text-primary hover:underline`}
              >
                Account data security
              </a>
            </li>
            <li>
              <a
                href="#transaction-info"
                className={`text-primary hover:underline`}
              >
                Information on account transaction
              </a>
            </li>
            <li>
              <a
                href="#traffic-data"
                className={`text-primary hover:underline`}
              >
                About traffic data
              </a>
            </li>

            <li>
              <a
                href="#third-parties"
                className={`text-primary hover:underline`}
              >
                Information about third parties
              </a>
            </li>
            <li>
              <a
                href="#customer-service"
                className={`text-primary hover:underline`}
              >
                Customer service
              </a>
            </li>
            <li>
              <a
                href="#ddos-protection"
                className={`text-primary hover:underline`}
              >
                DDoS protection
              </a>
            </li>
          </ul>
        </nav>
      </aside>
      <main
        ref={mainRef}
        className={`flex-1 bg-white dark:bg-black dark:text-white text-black p-6 overflow-y-auto no-scrollbar`}
      >
        <h1 className="dark:text-white text-black text-4xl font-bold">
          Data Protection
        </h1>
        <section
          id="general-information"
          className={`mb-10 mt-14 section-privacy-policy`}
        >
          <h2
            className={`text-2xl font-semibold mb-2 dark:text-white text-black`}
          >
            General Information
          </h2>
          <p className={`dark:text-gray-300 text-gray-700`}>
            Babelcoins system is serious about security of the personal
            information of customers and uses this provided information from
            customers only in accordance with the terms of this Privacy Policy.
            In order to use some services of Babelcoins system and reduce fraud
            and theft, our system asks you to provide information about yourself
            and your credit or debit card, in case you make payments by a card
            via Babelcoins system for the first time.
          </p>
        </section>
        <section id="opening-account" className="mb-10 section-privacy-policy">
          <h2
            className={`text-2xl font-semibold mb-2 dark:text-white text-black`}
          >
            Opening of the electronic account
          </h2>
          <p className={`dark:text-gray-300 text-gray-700`}>
            To open an electronic account in Babelcoins system, you will need to
            provide your first and last name, address, city, and email address.
            Also, you can open a business account; for this, you will need to
            provide documents about your company. Business account can be
            replenished from your company bank account.
          </p>
        </section>
        <section id="data-profile" className="mb-10 section-privacy-policy">
          <h2
            className={`text-2xl font-semibold mb-2 dark:text-white text-black`}
          >
            Data and profile
          </h2>
          <p className={`dark:text-gray-300 text-gray-700`}>
            Periodically our Babelcoins system can offer our customers to
            complete additional questionnaires and to participate in surveys.
            This is done both for the collection of demographic information, as
            well as to identify the needs of our clients and also to assess the
            quality of services we provide.
          </p>
        </section>
        <section id="account-security" className="mb-10 section-privacy-policy">
          <h2
            className={`text-2xl font-semibold mb-2 dark:text-white text-black`}
          >
            Account data security
          </h2>
          <p
            className={`dark:text-gray-300 text-gray-700
            `}
          >
            To expand the limits through Babelcoins system, you can, but are not
            obliged to provide information on the credit or debit card (without
            a secret code) or information about your personal bank account. We
            may also ask you to answer a variety of questions in order to check
            the security of your account. This information may be necessary for
            us in order to process your transactions, requests for a new
            password if you forget or lose your password, protect you against
            data theft from your card, to prevent fraud and theft from your
            account and in order to contact you, also when we need to administer
            your account. In order to protect against possible fraud and theft,
            we check all the information that you have provided to us. We use
            this information to provide you with security in time of use of our
            services
          </p>
        </section>
        <section id="transaction-info" className="mb-10 section-privacy-policy">
          <h2
            className={`text-2xl font-semibold mb-2 dark:text-white text-black`}
          >
            Information on account transaction
          </h2>
          <p className={`dark:text-gray-300 textgray-700`}>
            When sending or receiving funds via the Babelcoins payment system,
            we may ask you to provide information about every such transaction,
            including the total amount and the name of the user (sender). All
            this information is saved and is never disclosed without an official
            request. We also save all IP addresses used for logging in to your
            account. All of these measures aim to prevent fraud and theft.
          </p>
        </section>
        <section id="traffic-data" className="mb-10 section-privacy-policy">
          <h2
            className={`text-2xl font-semibold mb-2 dark:text-white text-black`}
          >
            About traffic data
          </h2>
          <p className={`dark:text-gray-300 text-gray-700`}>
            If you are a registered user of Babelcoins system, your name, email
            address, and account type can be displayed for other system
            customers. The number of your card and bank account and other
            financial information will never be given to third parties, except
            as otherwise provided by law.
          </p>
        </section>
        <section id="third-parties" className="mb-10 section-privacy-policy">
          <h2
            className={`text-2xl font-semibold mb-2 dark:text-white text-black`}
          >
            Information about third parties
          </h2>
          <p className={`dark:text-gray-300 text-gray-700`}>
            All the information you provide, as described above, shall not be
            disclosed by us to third parties without official request. If you
            send or receive a large volume of payments that pass through
            Babelcoins system, in some cases, we can make an additional check of
            your business (for business accounts only), requesting information
            about you and your business activities from a credit bureau or a
            business information service.
          </p>
          <p className={`dark:text-gray-300 text-gray-700`}>
            Babelcoins System is not responsible for the consequences that have
            arisen in case when customer disclosures information about his
            account in Babelcoins system. We also reserve the right to
            periodically, at random, to view reports on the activity done by the
            customer on accounts and reserve the right to close accounts if
            received information by us is that account is related to fraud or
            theft.
          </p>
        </section>
        <section id="customer-service" className="mb-10 section-privacy-policy">
          <h2
            className={`text-2xl font-semibold mb-2 dark:text-white text-black`}
          >
            Customer service
          </h2>
          <p className={`dark:text-gray-300 text-gray-700`}>
            All your correspondence with technical experts of Babelcoins system
            is maintained in the records of your account. This is done in order
            to monitor the quality of services we provide to our clients. Save
            this correspondence (information) also helps us in the investigation
            of fraud and theft.
          </p>
        </section>
        <section id="ddos-protection" className="mb-10 section-privacy-policy">
          <h2
            className={`text-2xl font-semibold mb-2 dark:text-white text-black`}
          >
            DDoS protection
          </h2>
          <p className={`dark:text-gray-300 text-gray-700`}>
            The site is reliably protected from DDoS-attacks via Vistnet.
          </p>
        </section>
      </main>
    </div>
  );
}
