import React from "react";
import "./styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";


export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
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

  return (
    <>
    <Header time = {props.time} />
    {mode === EMPTY && <Empty onAdd={onAdd} />}
     {mode === SHOW && props.interview && <Show student = {props.interview["student"]} interviewer = {props.interview.interviewer}  />}
     {mode === CREATE && <Form interviewers = {props.interviewers} onCancel={onCancel}/>}
    </>
  );
};