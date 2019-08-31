import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React, { useState } from "react";

export default Tasks => {
  const { data, loading } = useQuery(
    gql`
      query GetAllTasks {
        getAllTasks @client
      }
    `
  );

  const [saveTask] = useMutation(gql`
    mutation SaveTask($title: String!, $description: String!) {
      addTask(title: $title, description: $description) @client
    }
  `);

  const [title, setTitle] = useState("omega");
  const [description, setDescription] = useState("lul");

  const submitForm = () => {
    console.log("submitted", title, description);
    saveTask({
      variables: {
        title,
        description
      }
    });
    console.log(saveTask);
    return false;
  };

  //  const loading = true, data="";
  // true until slowest query is fetched
  if (loading) {
    return <div>...loading</div>;
  }

  return (
    <div>
      <h1>Client Query</h1>
      <div>tasks {JSON.stringify(data)}</div>
      <form>
        <div>
          Title:{" "}
          <input
            value={title}
            onChange={event => setTitle(event.target.value)}
            type="text"
            name="title"
          />
        </div>
        <div>
          Description:{" "}
          <input
            value={description}
            onChange={event => setDescription(event.target.value)}
            type="text"
            name="description"
          />
        </div>
        <button type="button" onClick={submitForm}>
          Save Task
        </button>
      </form>
    </div>
  );
};
