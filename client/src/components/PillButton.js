import { styled } from "@mui/material/styles";
import MuiButton from "@mui/material/Button";

const Button = styled(MuiButton)(({ pill }) => ({
    borderRadius: pill ? 50 : 4
  }));

export default Button