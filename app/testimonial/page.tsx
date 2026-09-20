import { permanentRedirect } from "next/navigation";

const Page = () => {
  permanentRedirect("/about");
};

export default Page;
