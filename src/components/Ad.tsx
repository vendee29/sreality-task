import { DatabaseAd } from "../../utils/types";

const Ad = (props: DatabaseAd) => {
  return (
    <div key={props.id} className="ad-card">
      <img src={props.image_url} alt={props.title} />
      <h3>{props.title}</h3>
    </div>
  );
};

export default Ad;
