import React from 'react';
import styled from 'styled-components';
import Task from './Task';
import { StrictModeDroppable } from './StrictModeDroppable';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 10em;

  display: flex;
  flex-direction: column;
`
const Title = styled.h3`
  padding: 8px;
`
const TaskList = styled.div`
  padding: 8px;
  flex-grow: 1;
  min-height: 4em;
`

export default function Column ({column, tasks}) {
  return (
      <Container>
        <Title>{column.title}</Title>
        <StrictModeDroppable droppableId={column.id}>
          { provided => (
            <TaskList 
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {tasks.map((task, index) => <Task key={task.id} task={task} index={index} />)}
              {provided.placeholder}
            </TaskList>
          )}
        </StrictModeDroppable>
      </Container>
    )
  }
