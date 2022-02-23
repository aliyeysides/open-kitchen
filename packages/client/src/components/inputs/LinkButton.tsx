import Button, { ButtonProps } from "@mui/material/Button";
import { Link, LinkProps } from "react-router-dom";

type LinkButtonProps = ButtonProps & LinkProps;

export default function LinkButton(props: LinkButtonProps) {
  const { to, children, color, variant } = props;
  return (
    <Button
      color={color ? color : "inherit"}
      variant={variant}
      component={Link}
      to={to}
    >
      {children}
    </Button>
  );
}
