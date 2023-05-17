import React, {useState} from "react";
import Header from "../components/Header/Header";
import Button from "../components/Button/Button";
import Filter from "../components/Filter/Filter";
import Table from "../components/Table/Table";
import {setModal} from "../../stores/word";
import {useDispatch, useSelector} from "react-redux";
function Mywords() {
  const dispatch = useDispatch();
  const allWords = useSelector((state: any) => state.word.allWords);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAddOrEdit, setAddOrEdit] = useState(null);
  const [category, setCategory] = useState("all");
  const limit = 8;
  const handleAdd = () => {
    dispatch(setModal(true));
    setAddOrEdit(false);
  };
  return (
    <div className="main">
      <Header />
      <main className="content">
        <div className="content-heading">
          <div className="content-heading-left">
            <div className="content-heading-left-title">My Words</div>
            <div className="content-heading-left-subtitle">You can add words to make it easier to understand what you read.</div>
          </div>
          <div className="content-heading-right">
            <Button text="Add Word" icon={true} onClick={handleAdd} />
          </div>
        </div>
        <Filter category={category} setCategory={setCategory} />
        <Table
          limit={limit}
          wordCount={allWords.length}
          category={category}
          setIsDeleting={setIsDeleting}
          isDeleting={isDeleting}
          isAddOrEdit={isAddOrEdit}
          setAddOrEdit={setAddOrEdit}
        />
      </main>
    </div>
  );
}
export default Mywords;
