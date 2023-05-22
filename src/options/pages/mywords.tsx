import React, {useEffect, useState} from "react";
import Filter from "../components/Filter/Filter";
import Table from "../components/Table/Table";
import {setModal} from "../../stores/word";
import {useDispatch, useSelector} from "react-redux";
import PageTitle from "../components/PageTitle/PageTitle";
import {Navigate} from "react-router-dom";
function Mywords() {
  const {token} = useSelector((state: any) => state.word);
  if (!token) {
    return <Navigate to="/login" />;
  }
  const dispatch = useDispatch();
  const [isAddOrEdit, setAddOrEdit] = useState(null);
  const limit = 8;
  const handleAdd = () => {
    dispatch(setModal(true));
    setAddOrEdit(false);
  };

  return (
    <main className="content">
      <PageTitle
        title="My Words"
        description="You can add words to make it easier to understand what you read."
        onClick={handleAdd}
        buttonText="Add Word"
        buttonIcon={true}
      />
      <Filter />
      <Table limit={limit} isAddOrEdit={isAddOrEdit} setAddOrEdit={setAddOrEdit} />
    </main>
  );
}
export default Mywords;
