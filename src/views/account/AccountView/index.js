import React, { useEffect, useState } from 'react';
import { Container, makeStyles, Box } from '@material-ui/core';
import Page from 'src/components/Page';
import useAxios from 'axios-hooks';
import ProfileDetails from './ProfileDetails';
import Profile from './Profile';
import { useCurrentUser } from '../../../states';
import Alert from '@material-ui/lab/Alert';
import Resizer from 'react-image-file-resizer';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Account = () => {
  const classes = useStyles();
  const [affectedRows, setAffectedRows] = useState(0);
  //app states
  const [currentUser] = useCurrentUser();
  const [currentFile, setCurrentFile] = useState();
  const [imagePreview, setImagePreview] = useState();
  //http request
  const [
    { data: putData, loading: putLoading, error: putError },
    executePut
  ] = useAxios(
    {
      url: `/records/user_details/${currentUser.currentUserDetailID}`,
      method: 'PUT'
    },
    {
      manual: true
    }
  );

  const [
    { data: getDetailData, loading: getDetailLoading, error: getDetailError },
    refetchUserDetails
  ] = useAxios(
    {
      url: `/records/user_details?filter=user_id,eq,${currentUser.currentUserID}`,
      method: 'GET'
    },
    {
      manual: false
    }
  );
  //observers
  useEffect(() => {
    const timeOutId = setTimeout(() => setAffectedRows(0), 2000);
    return () => clearTimeout(timeOutId);
  }, [affectedRows]);
  //callback
  const onSubmit = async data => {
    if (currentUser.currentUserID > 0) {
      const { data: rows } = await executePut({
        data: {
          first_name: data.firstName,
          middle_name: data.middleName,
          last_name: data.lastName,
          address: data.address,
          contact_number: data.contactNumber,
          birth_date: data.birthDate,
          gender: data.gender,
          profile_pic: currentFile
        }
      });
      setAffectedRows(rows);
    }
    //user.user_id > 0 && navigate('/app/dashboard');
  };
  const handleOnChangeImage = async event => {
    let file = event.target.files[0];
    if (file) {
      const image = await resizeFile(file);
      const pureBase64 = image.split(';')[1].split(',')[1];
      console.log(image);
      setCurrentFile(pureBase64);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const resizeFile = file =>
    new Promise(resolve => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        'JPEG',
        100,
        0,
        uri => {
          resolve(uri);
        },
        'base64'
      );
    });
  return (
    <Page className={classes.root} title="Account">
      <Container maxWidth="lg">
        <Box mb={2}>
          {putError ||
            (getDetailError && (
              <Alert severity="error" color="error">
                Error while requesting to server.
              </Alert>
            ))}
          {putLoading ||
            (getDetailLoading && (
              <Alert severity="info" color="info">
                Saving...
              </Alert>
            ))}
          {affectedRows > 0 && (
            <Alert severity="success" color="success">
              Details has been saved!
            </Alert>
          )}
        </Box>
        <Profile
          profile={getDetailData ? getDetailData.records[0] : {}}
          onChangeImage={handleOnChangeImage}
          imagePreview={imagePreview}
        />
        <Box mt={3}>
          <ProfileDetails
            detail={getDetailData ? getDetailData.records[0] : {}}
            onSubmit={onSubmit}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default Account;
