import { useRouter } from "next/router";
export default function Messages(props) {
  const router = useRouter();
  return (
    <div>
      <p>This is messages page</p>
    </div>
  );
}
