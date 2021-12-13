import React from "react";
import "./styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "components/Appointment/Status";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const interviewers = [];

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  ); 

  function onAdd() {
    transition(CREATE)
  };

  function onCancel() {
    back()
  };

function save(name, interviewer) {
  const interview = {
    student: name,
    interviewer
  };

  transition(SAVING);

  props.bookInterview(props.id, interview);
  //timer to display the saving transition for 1 second//

  setTimeout(() => {
    transition(SHOW);
  }, 1000);
}

  return (
    <>
    <Header time = {props.time} />
    {mode === EMPTY && <Empty onAdd={onAdd} />}
     {mode === SHOW && props.interview && <Show student = {props.interview["student"]} interviewer = {props.interview.interviewer}  />}
     {mode === CREATE && <Form interviewers = {props.interviewers} onCancel={onCancel} onSave={save} />}
     {mode === SAVING && <Status message = "Saving" />}
    </>
  );
};