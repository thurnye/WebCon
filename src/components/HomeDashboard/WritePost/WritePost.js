import React, { useState } from 'react';
import { useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import styles from './WritePost.module.css';
import services from '../../../util/services';
import { 
  MdDeleteOutline, 
  MdOutlineModeEditOutline, 
  MdOutlineVideocam,
  MdOutlineImage,
} from 'react-icons/md';
import {
  Box,
  Divider,
  Typography,
  useTheme,
  Button,
  IconButton,
  // useMediaQuery,
} from "@mui/material";
import FlexBetweenBox from '../../FlexBetweenBox/flexBetweenBox';
import Avatar from '../../Avatar/Avatar'
import WidgetWrapper from '../../WidgetWrapper/WidgetWrapper';
import CompTextEditor from '../../CompTextEditor/CompTextEditor';
import { convertToBase64 } from '../../../util/common/general';
import { StatusCode } from 'util/common/enums';

const WritePost = () => { 
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState([]);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const user = useSelector((state) => state.user);

  // const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handleConvert = async (files) => {
    const fileCollection = [...image];
    for (let i = 0; i < files.length; i++) {
      const base64 = await convertToBase64(files[i]);
      fileCollection.push({image: base64, name: files[i].name});
    };

    setImage(fileCollection);
  };

  const removeImagePreview = (index) => {
    const imgs = [...image];
    imgs.splice(index, 1);
    setImage(imgs);
  };

  const handlePost = async () => {
    const newPost = {
      post: post,
      location: user.location,
      images: image,
      author: user._id
    };
    const result = await services.postPost(newPost);
    console.log(result.status === StatusCode.success);
    if(result.status === StatusCode.success){
      setPost('');
      setImage([]);
    }
  };


  return(
    <div className={styles.WritePost} data-testid="WritePost">
      <WidgetWrapper>
        <Box sx={{display: "flex"}}>
          <Avatar image={user.picture}/>
          <Box sx={{
            backgroundColor: palette.neutral.light,
            marginLeft: "1rem",
            flexGrow: 1
          }}>
            <CompTextEditor 
            setEditorData={setPost} 
            show={false} placeholder='Write a Post...'
            />
          </Box>
        </Box>


        {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            multiple={true}
            onDrop={(acceptedFiles) => handleConvert(acceptedFiles)}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetweenBox>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {image.length === 0 ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetweenBox>
                      <Typography>Add More Images</Typography>
                      <MdOutlineModeEditOutline />
                    </FlexBetweenBox>
                  )}
                </Box>
              </FlexBetweenBox>
            )}
          </Dropzone>
          {image.length > 0 && 
          <FlexBetweenBox>
            <Box
              border={`2px dashed ${palette.primary.main}`}
              p="1rem"
              width="100%"
              sx={{ "&:hover": { cursor: "pointer" }, height: '200px', overflow: 'auto' }}
            >
                {image.map((img, i) => <FlexBetweenBox key={`${img.name}_${i}`}>
                  <Typography>{img.name}</Typography>
                  <IconButton
                onClick={() => removeImagePreview(i)}
                sx={{ width: "15%" }}
              >
                <MdDeleteOutline />
              </IconButton>
                </FlexBetweenBox>)
              }
            </Box>
          </FlexBetweenBox>
          }
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetweenBox>
        <FlexBetweenBox gap="1.5rem">
          <FlexBetweenBox gap="0.25rem" onClick={() => setIsImage(!isImage)}>
            <MdOutlineImage sx={{ color: mediumMain }} />
            <Typography
              color={mediumMain}
              sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            >
              Image
            </Typography>
          </FlexBetweenBox>

          <FlexBetweenBox gap="0.25rem">
            <MdOutlineVideocam sx={{ color: mediumMain }} />
            <Typography color={mediumMain}>Video</Typography>
          </FlexBetweenBox>

        </FlexBetweenBox>

        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            borderColor: palette.primary.main,
            borderRadius: "1rem",
            borderWidth: '1px',
            borderStyle: 'solid'
          }}
        >
          POST
        </Button>
      </FlexBetweenBox>
      </WidgetWrapper>
    </div>
  )
};

export default WritePost;
