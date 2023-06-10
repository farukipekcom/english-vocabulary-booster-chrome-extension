import React, {useEffect} from "react";
import PageTitle from "../components/PageTitle/PageTitle";
import {useDispatch, useSelector} from "react-redux";
import {fetchUser, fetchWords} from "../../stores/word";
function Home() {
  const {userResponse, userSuccess} = useSelector((state: any) => state.word);
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(fetchWords());
    dispatch(fetchUser());
  }, []);
  return (
    <React.Fragment>
      <div className="content">{userSuccess ? <PageTitle title={`Welcome back, ${userResponse?.name.split(" ")[0]}`} /> : ""}</div>
    </React.Fragment>
  );
}

export default Home;
