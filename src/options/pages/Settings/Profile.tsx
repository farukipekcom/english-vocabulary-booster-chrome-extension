import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import styles from "./Styles.module.scss";
import Button from "../../components/Button/Button";
import InputText from "../../components/InputText/InputText";
import {fetchSettings, fetchUser} from "../../../stores/word";
import {supabase} from "../../lib/helper/supabaseClient";
import {v4 as uuidv4} from "uuid";
import {resizeFile} from "../../lib/resizeFile";
import {EmailIcon} from "../../components/icons";
import {MyToast} from "../../lib/toast";
function Profile() {
  const {token} = useSelector((state: any) => state.word);
  const dispatch = useDispatch<any>();
  const {userLoading, userResponse, userSuccess} = useSelector((state: any) => state.word);
  const [resizeImage, setResizeImage] = useState(null);
  const [resizeBlob, setResizeBlob] = useState(null);
  const [uuid, setUuid] = useState(null);
  const imagePath = `${process.env.REACT_APP_SUPABASE_PHOTO_URL}${userResponse?.image_path}`;
  const [formValue, setformValue] = useState({
    name: userResponse?.name,
    email_address: userResponse?.email_address,
    image_path: userResponse?.image_path,
  });
  useEffect(() => {
    userSuccess &&
      setformValue({
        ...formValue,
        name: userResponse?.name,
        email_address: userResponse?.email_address,
        image_path: userResponse?.image_path,
      });
  }, [userSuccess]);
  const handleChangeInput = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };
  useEffect(() => {
    dispatch(fetchSettings());
  }, []);
  useEffect(() => {
    setUuid(uuidv4());
  }, []);
  const handleAdd = async (e) => {
    e.preventDefault();
    const res = await supabase
      .from("user")
      .update({...formValue, image_path: userResponse?.image_path && !resizeBlob ? userResponse?.image_path : "public/" + uuid})
      .eq("user_uuid", token.user.id)
      .select();
    const {data, error} = await supabase.storage.from("profiles").upload("public/" + uuid, resizeImage, {
      contentType: "image/png",
    });
    data || res.data ? MyToast("updateSuccess") : MyToast("updateError");
    setResizeImage(null);
    dispatch(fetchUser());
  };
  const handleUpload = async (e) => {
    let file;
    if (e.target.files) {
      file = e.target.files[0];
    }
    const resizeImage: any = await resizeFile(file);
    setResizeImage(await resizeImage);
    setResizeBlob(URL.createObjectURL(resizeImage));
    setformValue({
      ...formValue,
      image_path: "public/" + uuid,
    });
  };
  const onChangeStatus =
    userResponse?.name !== formValue.name ||
    userResponse?.email_address !== formValue.email_address ||
    userResponse?.image_path !== formValue.image_path
      ? true
      : null;

  return (
    <>
      {!userLoading && (
        <form className={styles.list} onSubmit={onChangeStatus && handleAdd}>
          <div className={styles.heading}>
            <div className={styles.title}>
              <div className={styles.title}>Profile</div>
              <div className={styles.description}>Update your profile details here.</div>
            </div>
            <div className={styles.button}>
              <div className={`${onChangeStatus ? styles.buttonActive : styles.button}`}>
                <Button text="Save" />
              </div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.settingName}>Name</div>
            <div className={styles.setting}>
              <InputText
                placeholder="Enter your name"
                type="text"
                name="name"
                value={formValue.name !== undefined ? formValue.name : userResponse?.name || ""}
                onChange={handleChangeInput}
              />
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.settingName}>Email Address</div>
            <div className={styles.setting}>
              <div className={styles.inputGroup}>
                <EmailIcon />
                <InputText
                  placeholder="Email Address"
                  type="text"
                  name="email_address"
                  value={formValue.email_address !== undefined ? formValue.email_address : userResponse?.email_address || ""}
                  onChange={handleChangeInput}
                />
              </div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.settingName}>Profile Photo</div>
            <div className={styles.setting}>
              <div className={styles.profilePhoto}>
                {userSuccess === true && userResponse?.image_path && !resizeBlob ? (
                  <img className={styles.profilePhotoImage} src={imagePath} />
                ) : resizeBlob ? (
                  <img className={styles.profilePhotoImage} src={resizeBlob} />
                ) : (
                  <div className={styles.profilePhotoText}>{userSuccess && userResponse?.name.charAt(0)}</div>
                )}
                <label htmlFor="file_input" className={styles.dropContainer}>
                  <span className={styles.dropTitle}>Drop files here</span>
                  or
                  <input
                    className={`${resizeImage && styles.selected}`}
                    type="file"
                    id="file_input"
                    accept="image/*"
                    name="image_path"
                    onChange={(e) => {
                      handleUpload(e);
                    }}
                  />
                </label>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
{
}
export default Profile;
