import axios from "axios";
import {
  getDatabase,
  ref,
  set,
  onValue,
  push,
  update,
  remove,
} from "firebase/database";
import { useFirebase } from "../../config";

export const setTags = (tags) => ({
  type: "SET_TAGS",
  payload: tags,
});

export const addTag = (tag) => ({
  type: "ADD_TAG",
  payload: tag,
});

export const updateTag = (tag) => ({
  type: "UPDATE_TAG",
  payload: tag,
});

export const deleteTag = (tagId) => ({
  type: "DELETE_TAG",
  payload: tagId,
});

export const fetchTags = (useFirebase) => {
  return (dispatch) => {
    if (useFirebase) {
      const db = getDatabase();
      const tagsRef = ref(db, "tags");
      onValue(tagsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const tags = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          dispatch(setTags(tags));
        } else {
          dispatch(setTags([]));
        }
      });
    } else {
      axios.get("/api/tags").then((response) => {
        dispatch(setTags(response.data));
      });
    }
  };
};

export const saveTag = (tag, useFirebase) => {
  return (dispatch) => {
    if (useFirebase) {
      const db = getDatabase();
      if (tag.id) {
        const tagRef = ref(db, "tags/" + tag.id);
        update(tagRef, tag).then(() => {
          dispatch(updateTag(tag));
        });
      } else {
        const newTagRef = push(ref(db, "tags"));
        const newTagId = newTagRef.key;
        set(newTagRef, { ...tag, id: newTagId }).then(() => {
          dispatch(addTag({ ...tag, id: newTagId }));
        });
      }
    } else {
      if (tag.id) {
        axios.put(`/api/tags/${tag.id}`, tag).then((response) => {
          dispatch(updateTag(response.data));
        });
      } else {
        axios.post("/api/tags", tag).then((response) => {
          dispatch(addTag(response.data));
        });
      }
    }
  };
};

export const deleteTagFromDb = (tagId, useFirebase) => {
  return (dispatch) => {
    if (useFirebase) {
      const db = getDatabase();
      const tagRef = ref(db, "tags/" + tagId);
      return remove(tagRef)
        .then(() => {
          dispatch(deleteTag(tagId));
          return true; // Return true if the deletion is successful
        })
        .catch((error) => {
          console.error("Error deleting tag:", error);
          return false; // Return false if there was an error
        });
    } else {
      return axios
        .delete(`/api/tags/${tagId}`)
        .then(() => {
          dispatch(deleteTag(tagId));
          return true; // Return true if the deletion is successful
        })
        .catch((error) => {
          console.error("Error deleting tag:", error);
          return false; // Return false if there was an error
        });
    }
  };
};
