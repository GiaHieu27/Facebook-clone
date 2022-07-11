import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const ProfileContext = createContext();

function ProfileProvider({ children }) {
  const { user } = useSelector((state) => ({ ...state }));
  const { profile, loading } = useSelector((state) => {
    return state.profile;
  });
  const detailss = profile.details;
  const [details, setDetails] = useState(detailss);

  const initInfos = {
    bio: details?.bio ? details.bio : "",
    otherName: details?.otherName ? details.otherName : "",
    job: details?.job ? details.job : "",
    workplace: details?.workplace ? details.workplace : "",
    highSchool: details?.highSchool ? details.highSchool : "",
    college: details?.college ? details.college : "",
    currentCity: details?.currentCity ? details.currentCity : "",
    hometown: details?.hometown ? details.hometown : "",
    relationship: details?.relationship ? details.relationship : "",
    instagram: details?.instagram ? details.instagram : "",
  };

  const [infos, setInfos] = useState(initInfos);
  const [max, setMax] = useState(infos?.bio ? 100 - infos?.bio.length : 100);
  const [showBio, setShowBio] = useState(false);
  const [error, setError] = useState("");
  const [othername, setOthername] = useState("");

  useEffect(() => {
    setDetails(detailss);
    setInfos(detailss);
  }, [detailss]);

  useEffect(() => {
    setMax(100 - infos?.bio.length);
  }, [infos, setMax]);

  useEffect(() => {
    setOthername(profile?.details?.otherName);
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfos({ ...infos, [name]: value });
    setMax(100 - e.target.value.length);
  };

  const updateDetails = async () => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/updateDetails`,
        { infos },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setShowBio(false);
      setDetails(data);
      setOthername(data.otherName);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        infos,
        setInfos,
        max,
        setMax,
        details,
        setDetails,
        showBio,
        setShowBio,
        user,
        error,
        setError,
        othername,
        setOthername,
        handleChange,
        updateDetails,
        loading,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export { ProfileContext, ProfileProvider };
