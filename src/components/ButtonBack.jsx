import { useNavigate } from "react-router-dom";
import Button from "./Button";

function ButtonBack() {
  const navigation = useNavigate();
  return (
    <Button
      type="back"
      onClick={(e) => {
        e.preventDefault();
        navigation("/app/cities");
      }}
    >
      &larr; Back
    </Button>
  );
}

export default ButtonBack;
