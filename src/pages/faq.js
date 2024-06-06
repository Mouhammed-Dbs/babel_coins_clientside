export default function Faq() {
  return <div></div>;
}
export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../../messages/${locale}.json`)).default,
    },
  };
}
