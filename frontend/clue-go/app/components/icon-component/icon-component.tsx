type IconProps = {
  name: string;
  variant?: "filled" | "outlined" | "round" | "sharp";
};

export const IconComponent = ({ name, variant = "filled" }: IconProps) => {
  const className =
    variant === "filled"
      ? "material-icons text-primary"
      : `material-icons-${variant} text-primary`;
  return <span className={className}>{name}</span>;
};
