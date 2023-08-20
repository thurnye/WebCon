import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import styles from './InfoSection.module.css';
import { MdOutlineManageAccounts, MdOutlineModeEditOutline, MdOutlineWorkOutline, MdOutlineLocationOn } from 'react-icons/md';
import { Box, Typography, Divider, useTheme, TextField, Button, Badge, Link } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import Avatar from '../../Avatar/Avatar'
import FlexBetweenBox from '../../FlexBetweenBox/flexBetweenBox'
import WidgetWrapper from "../../WidgetWrapper/WidgetWrapper";
import { useLocation } from 'react-router';
import facebook from '../../../public/images/facebook.png'
import instagram from '../../../public/images/instagram.png'
import linkedIn from '../../../public/images/linkedIn.png'
import pinterest from '../../../public/images/pinterest.png'
import threads from '../../../public/images/threads.png'
import twitter from '../../../public/images/twitter.png'
import { getRandomInt } from 'util/common/general';
import services from '../../../util/services';
import {StatusCode} from '../../../util/common/enums';
import { authActions } from '../../../store/authSlice';

const InfoSection = () => {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.user);
  const friend = useSelector((state) => state.friend);
  const {state} = useLocation()
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(authUser);
  const [edit, setEdit] = useState();
  const [editSocials, setEditSocials] = useState(false);
  const { palette } = useTheme();
  const [media, setMedia] = React.useState([]);


  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const isUser = friend ? false : true;

  const socialMedia = [
    {
      name: 'Facebook',
      logo: facebook,
    },
    {
      name: 'Instagram',
      logo: instagram,
    },
    {
      name: 'LinkedIn',
      logo: linkedIn,
    },
    {
      name: 'Pinterest',
      logo: pinterest,
    },
    {
      name: 'Threads',
      logo: threads,
    },
    {
      name: 'Twitter',
      logo: twitter,
    }
  ];


  useEffect(() => {
    setLoading(true);
    if(!friend){
      setLoading(false);
      setUser(authUser);
    }
    if(friend){
      console.log(friend);
      setUser(friend);
      setLoading(false);
    };
    setMedia(authUser.mediaPlatforms);

  },[authUser, isUser, state, user, friend]);


  const handleMediaChange = (e, type) => {
    e.preventDefault();
    const linkValue = e.target.value;
    const updatedMedia = media.map(el => {
      if (el.name === type) {
        return { ...el, link: linkValue };
      }
      return el;
    });

    const existingMedia = updatedMedia.find(el => el.name === type);
    if (!existingMedia) {
      updatedMedia.push({
        name: type,
        link: linkValue,
      });
    }

    setMedia(updatedMedia);
  };

  const handleEdit = (name) => {
    if (edit?.name === name) {
      setEdit(prevEdit => ({
        ...prevEdit,
        show: !prevEdit.show,
      }));
    } else {
      setEdit({
        show: true,
        name: name,
      });
    }
  };

  const handleCancel = () => {
    setEditSocials(false);
    setMedia(authUser.mediaPlatforms);
  };

  const handleSave = async () => {
    const updatedUser = {
      id: authUser._id,
      firstName : authUser.firstName,
      lastName :  authUser.lastName,
      picture :  authUser.picture,
      location :  authUser.location,
      occupation :  authUser.occupation,
      mediaPlatforms: media
    }
    const result = await services.postUpdateUser(updatedUser);
    if(result.status === StatusCode.success){
      dispatch(authActions.login(result.data));
      setMedia(result.data.user.mediaPlatforms);
    };
    setEditSocials(false);
  }


  return(
    <div className={styles.InfoSection} data-testid="InfoSection">
      <WidgetWrapper>
        {!loading ? <>
          <FlexBetweenBox
            gap="0.5rem"
            pb="1.1rem"
          >
            <FlexBetweenBox gap="1rem">
              <Avatar image={user.picture} />
              <Box>
                <Typography
                  variant="h4"
                  color={dark}
                  fontWeight="500"
                  sx={{
                    "&:hover": {
                      color: palette.primary.light,
                      cursor: "pointer",
                    },
                  }}
                >
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography color={medium}>{user.friends.length} friends</Typography>
              </Box>
            </FlexBetweenBox>
            {isUser && <MdOutlineManageAccounts />}
            
          </FlexBetweenBox>

          <Divider />

          {/* location/Job */}
          <Box p="1rem 0">
            <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
              <MdOutlineLocationOn fontSize="large" sx={{ color: main }} />
              <Typography color={medium}>{user.location}</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap="1rem">
              <MdOutlineWorkOutline fontSize="large" sx={{ color: main }} />
              <Typography color={medium}>{user?.occupation}</Typography>
            </Box>
          </Box>

          <Divider />

          {/* Views/Impressions */}
          <Box p="1rem 0">
            <FlexBetweenBox mb="0.5rem">
              <Typography color={medium}>Who's viewed your profile</Typography>
              <Typography color={main} fontWeight="500">
                {user?.viewedProfile}
              </Typography>
            </FlexBetweenBox>
            <FlexBetweenBox>
              <Typography color={medium}>Impressions of your post</Typography>
              <Typography color={main} fontWeight="500">
                {user?.impressions}
              </Typography>
            </FlexBetweenBox>
          </Box>

          <Divider />

          {/* SocialMedia */}
          <Box p="1rem 0">
            <FlexBetweenBox gap="1rem">
              <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                Social Profiles
              </Typography>
              {isUser && <MdOutlineModeEditOutline sx={{ color: main }} onClick={() => setEditSocials(!editSocials)}/>}
            </FlexBetweenBox>
            {socialMedia.map((el)=> <React.Fragment key={getRandomInt()}>
              <FlexBetweenBox gap="1rem" mb="0.5rem">
                <FlexBetweenBox gap="1rem">
                  {isUser ? 
                    <Badge 
                    color="error" 
                    variant="dot" 
                    invisible={media.find(item => item.name === el.name)?.link ? true : false }
                    >
                    <img src={el.logo} alt='img' width={25}/>

                    </Badge>
                    : <img src={el.logo} alt='img' width={25}/> 
                  }
                  <Box>
                  <Link 
                  href={media.find(item => item.name === el.name)?.link} 
                  underline="none" 
                  color={main} 
                  fontWeight="500" 
                  target="_blank" 
                  rel="noopener"
                  sx={{cursor: 'pointer'}}
                  >
                    {el.name} 
                  </Link>
                    {/* <Typography color={main} fontWeight="500">
                      {el.name} 
                    </Typography> */}

                      <Typography color={medium}>Social Network</Typography>
                  </Box>
                </FlexBetweenBox>
                {editSocials && <MdOutlineModeEditOutline sx={{ color: main }} onClick={() => handleEdit(el.name)}/>}
              </FlexBetweenBox>
              {editSocials && edit?.name === el.name && edit?.show &&
              <TextField
                key={`textfield-${el.name}`}
                id={`outlined-${el.name}-link`}
                value={media.find(item => item.name === el.name)?.link || ''}
                onChange={(e) => handleMediaChange(e, el.name)}
                size="small"
                placeholder={`Paste ${el.name.toLowerCase()} link here`}
                autoFocus
              />
              }
            </React.Fragment>
            )}
            {editSocials && 
              <Box sx={{p: '1rem 0', display: 'flex', justifyContent: 'flex-end'}}>
              <Button 
              variant="outlined" 
              sx={{mr: '1rem'}} 
              size="small"
              onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button 
              variant="outlined"  
              size="small"
              onClick={handleSave}
              disabled={media.length > 0 ? false: true}
              >
                Save
              </Button>
              </Box>
            }
          </Box>
        </> 
        :
        <>
        Loading...
        </>}
    </WidgetWrapper>
    </div>
  )
};



export default InfoSection;
