import { Button } from "@databiosphere/findable-ui/lib/components/common/Button/button";

export const ButtonPrimary = ({
  ...props /* Spread props to allow for Button specific prop overrides. */
}): JSX.Element => {
  return <Button color="primary" variant="contained" {...props} />;
};
