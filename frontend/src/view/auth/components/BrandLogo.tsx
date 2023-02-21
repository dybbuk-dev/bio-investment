import { CardMedia } from '@mui/material';
import { useSelector } from 'react-redux';
import authSelectors from 'src/modules/auth/authSelectors';

export default function BrandLogo(props) {
  let brand = '/images/logo.png';
  return (
    <>
      <CardMedia
        src={brand}
        component="img"
        sx={{
          maxWidth: '100%',
          width: props.width ? props.width : 'auto',
          margin: 0,
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
    </>
  );
}
