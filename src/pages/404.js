import { useTranslations } from "next-intl";

export default function NotFoundPage() {
  const t = useTranslations("NotFoundPage");
  return (
    <div className="container m-auto mt-10 h-screen">
      <h1 className="text-4xl text-center">{t("h")}</h1>
    </div>
  );
}
