import React, {useState} from "react";
import Filter from "../components/Filter/Filter";
import Table from "../components/Table/Table";
import {setModal} from "../../stores/word";
import {useDispatch} from "react-redux";
import PageTitle from "../components/PageTitle/PageTitle";
function Mywords() {
  const dispatch = useDispatch();
  const [isAddOrEdit, setAddOrEdit] = useState(null);
  const [category, setCategory] = useState("all");
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
      <Filter category={category} setCategory={setCategory} />
      <Table limit={limit} category={category} isAddOrEdit={isAddOrEdit} setAddOrEdit={setAddOrEdit} />
    </main>
  );
}
export default Mywords;
