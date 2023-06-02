import React, {useEffect} from "react";
import PageTitle from "../components/PageTitle/PageTitle";
import {useDispatch} from "react-redux";
import {fetchWords} from "../../stores/word";
function Home() {
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(fetchWords());
  }, []);
  return (
    <div className="content">
      <PageTitle title="Welcome back, Faruk" />
    </div>
  );
}

export default Home;
