import { loadMessages } from "@/lib/loadMessages";
import { useTranslations } from "next-intl";

export default function NotFoundPage() {
  const t = useTranslations("NotFoundPage");
  return (
    <div className="container m-auto mt-10 h-screen">
      <h1 className="text-4xl text-center">{t("h")}</h1>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: await loadMessages(locale),
    },
  };
}
