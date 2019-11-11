import React, { useEffect, useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import { Typography, Grid } from "@material-ui/core/";
import { API } from "helpers";
import { UserContext, LoginContext } from "contexts";
import { Spinner, Education, Experience, Volunteer, AddNewExperience } from "components";
import AddBoxIcon from '@material-ui/icons/AddBox';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';

const Profile = props => {
  const { loginStatus } = useContext(LoginContext);
  const {
    setUserName,
    setUserLastName,
    setUserEmail,
    setUserProfile,
    avatarProfile,
    setAvatarProfile,
    userName,
    userLastName,
    userEmail,
    userProfile,
    isEditMode,
    setIsEditMode,
    isAddMode,
    setIsAddMode
  } = useContext(UserContext);

  useEffect(() => {
    const triggerAPI = async () => {
      const profileResponse = await API.getUserProfile();
      setUserName(profileResponse.response.first_name);
      setUserLastName(profileResponse.response.last_name);
      setUserEmail(profileResponse.response.emailId);
      const profileExtData = await API.getUserProfileExt();
      setUserProfile(profileExtData.response);
      setAvatarProfile(profileExtData.response.avatar);
    };
    if (loginStatus) {
      triggerAPI();
    }
  }, [loginStatus]);

  console.log("userProfile ====>", userProfile);



  const experience =
    typeof userProfile === "object" &&
    Array.isArray(userProfile.workExperience) ? (
        userProfile.workExperience.map((experience, index) => {
          return (
            <Experience
              key={index}
              data={{
                experience,
                index,
                listExperiences: userProfile.workExperience,
              }}
            />
          );
        })
      ) : (
        <Spinner />
      );

  const editBar = isEditMode ? (<Grid
    item
    container
    justify="space-between"
    xs={12}
    style={{
      backgroundColor: "rgba(255, 129, 0, 0.21)",
      height: "8vh",
      padding: "2vh",
    }}
  >
    <Grid item>
      <Typography variant="h6">Edit</Typography>
    </Grid>
    <Grid item>
      <CancelPresentationIcon onClick={() => setIsEditMode(false)} />
    </Grid>
  </Grid>) : "";

  const content =
    userProfile !== undefined && userProfile !== null ? (
      <>
        <Grid container justify="space-between" style={{ padding: "3vh" }}>
          <Grid item xs={5}>
            <img src={avatarProfile} />
          </Grid>
          <Grid container item xs={5} alignItems="center">
            <Grid>
              <Typography variant="h6">
                {userName} {userLastName}
              </Typography>
            </Grid>
            <Grid container>
              <Grid>
                <Typography variant="body1">
                  {userProfile.preferredLocation}
                </Typography>
              </Grid>
              <Grid>
                <Typography variant="body1">{userEmail}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid
            item
            container
            justify="space-between"
            xs={12}
            style={{
              backgroundColor: "rgba(8, 124, 149, 0.1)",
              height: "8vh",
              padding: "2vh",
            }}
          >
            <Grid item>
              <Typography variant="h5">Experience</Typography>
            </Grid>
            <Grid item>
              <AddBoxIcon onClick={() => setIsAddMode(true)}/>
            </Grid>
          </Grid>
            {editBar}
        </Grid>
        <Grid container>{experience}</Grid>
      </>
    ) : (
      <Spinner />
    );



  return isAddMode ?  <AddNewExperience /> : content;
};

export default withRouter(Profile);
