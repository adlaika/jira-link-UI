import { useForm } from "react-hook-form"
import * as R from 'ramda'
import React, { useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const Row = styled.div`
  display: flex;
`

export default function AddTasks ({handleAddTask}) {
  const { 
    register, 
    handleSubmit, 
    reset, 
    formState,
    formState: { errors, isSubmitSuccessful } 
  } = useForm({ defaultValues: {
    "tasks": "Build the widget, Sync with Whosit, Sleep"
  }});

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ tasks: '' })
    }
  }, [formState, reset]);

  const onSubmit = (data: { tasks: string; }) => {
    const tasks : string[] = R.map(task => R.trim(task), R.split(',', data.tasks))
    R.forEach(handleAddTask, tasks)
    reset()
  }

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea {...register("tasks", { required: true, minLength: 1 })} />
        
        {errors.tasks && <span>This field is required</span>}
        
        <Row>
          <input type="submit" value="Add to Unassigned Tasks"/>
        </Row>
      </form>
    </Container>
  );
}