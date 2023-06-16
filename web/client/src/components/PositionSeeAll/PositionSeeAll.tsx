import { useParams } from "react-router-dom";

function PositionSeeAll() {
  const { id } = useParams();

  return <>These are all the positions in ur org.</>;
}

export default PositionSeeAll;
