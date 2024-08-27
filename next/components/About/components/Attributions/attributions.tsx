import { Figure } from "../../../common/Figure/figure";
import { Grid } from "./attributions.styles";

export const Attributions = (): JSX.Element => {
  return (
    <Grid>
      <Figure
        alt="Human Cell Atlas Trademark"
        src="/hca-bio-networks/about/mosaic-ball.png"
        width={40}
      />
      The mosaic ball is a trademark of the Human Cell Atlas consortium.
    </Grid>
  );
};
