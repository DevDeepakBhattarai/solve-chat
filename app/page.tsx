import withAuth from "@/components/hoc/withAuth";

async function Home() {
  return <div className="">Hello There mate</div>;
}
export default withAuth(Home);
