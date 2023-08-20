import React from 'react';
import { Typography, useTheme , Link} from "@mui/material";
import FlexBetweenBox from '../FlexBetweenBox/flexBetweenBox';
import WidgetWrapper from "../WidgetWrapper/WidgetWrapper";
import styles from './Ads.module.css';
import adsImg from '../../public/images/img2.jpeg';


const Ads = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <div className={styles.Ads} data-testid="Ads">
      <WidgetWrapper>
      <FlexBetweenBox>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Ad</Typography>
      </FlexBetweenBox>
      <Link href="https://www.marleysinwah.com/" underline="none" target="_blank" rel="noopener">
        <img
          width="100%"
          height="auto"
          alt="advert"
          src={adsImg}
          style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
        />
      </Link>
      <FlexBetweenBox>
        <Typography color={main}>MarleyCosmetics</Typography>
        <Typography >
          <Link href="https://www.marleysinwah.com/" target="_blank" rel="noOpener" underline="hover" color={medium}>
            marleysinwah.com
        </Link>
          </Typography>
      </FlexBetweenBox>
      <Typography color={medium} m="0.5rem 0">
        Your pathway to stunning and immaculate Ui/Ux design experience and be sure to use our promo code DANWEBCON  for 45% OFF.
      </Typography>
    </WidgetWrapper>
    </div>
  )
};
export default Ads;
