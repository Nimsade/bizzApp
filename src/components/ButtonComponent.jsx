import { memo } from "react";
import Button from "@mui/material/Button";

const ButtonComponent = ({ color, children, onClick }) => {
  return (
    <Button variant="contained" color={color} onClick={onClick}>
      {children}
    </Button>
  );
};

export default memo(ButtonComponent);
