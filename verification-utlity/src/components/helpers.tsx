import { createHeader } from "../utils/helper";

export default function Helpers() {
  console.log(createHeader().then((res) => console.log(res)));
  return <></>;
}
