import { useParams } from "react-router-dom";

function Organization() {
  const { id } = useParams();

  return <>{id}</>;
}

export default Organization;
