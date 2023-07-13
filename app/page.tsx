import Logout from "@/components/Authentication/Logout";
import withAuth from "@/components/hoc/withAuth";

async function Home() {
  return (
    <div className="">
      Hello There mate
      <Logout></Logout>
    </div>
  );
}
export default Home;
// export default withAuth(Home);
