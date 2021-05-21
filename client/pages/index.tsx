import { useRouter } from "next/router";
import React from "react";

const Index = (props: { message: string }) => {
  const router = useRouter();
  return (
    <div>
      <h1>its me the app</h1>
      <h2>{props.message}</h2>
      <button onClick={() => router.push("/app")}>go to client side</button>
    </div>
  );
};
export default Index;

export const getServerSideProps = () => {
  return { props: { message: "INSANE MALDING" } };
};
