import { useParams } from "react-router-dom";

function Student() {
  const { id } = useParams();

  return <h1>{id}</h1>;
}

export default Student;
