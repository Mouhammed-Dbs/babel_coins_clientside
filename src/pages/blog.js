import { loadMessages } from "@/lib/loadMessages";

export default function blog() {
  return <div></div>;
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: await loadMessages(locale),
    },
  };
}
