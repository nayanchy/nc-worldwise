import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
function Map() {
  const [searchParam, setSearchParam] = useSearchParams();
  const navigate = useNavigate();
  const lat = searchParam.get("lat");
  const lng = searchParam.get("lng");

  const gotoForm = () => {
    navigate("form");
  };
  return (
    <div className={styles.mapContainer} onClick={gotoForm}>
      <p>Lat: {lat}</p>
      <p>Lng: {lng}</p>
      <button onClick={() => setSearchParam({ lat: 92, lng: 45 })}>
        Change Position
      </button>
    </div>
  );
}

export default Map;
