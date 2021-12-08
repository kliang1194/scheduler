import React from "react";
import "./styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";



export default function Appointment(props) {

    // const {student, interviewer} = props.interview

  return (
    <>
    <Header time = {props.time} />
    {props.interview ? <Show student = {props.interview["student"]} interviewer = {props.interview["interviewer"]}  /> : <Empty /> }
    </>
  );
};