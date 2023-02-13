import AddTasks from './AddTasks'
import { useState } from 'react'
import * as R from 'ramda'
import { v4 as uuidv4 } from 'uuid'
import Column from './Column'
import { DragDropContext } from 'react-beautiful-dnd'
import initialData from './initial-data'
import React from 'react'
import styled from 'styled-components'
import LinkMaker from './LinkMaker'

const Container = styled.div`
  display: flex;
`

const ContainerVertical = styled.div`
  display: flex;
  flex-direction: column;
`

export default function App () {
  const [state, setState] = useState(initialData)

  const handleAddTask = (taskName : string) => setState(state => {
    const { tasks, columns } = state
    const newId = uuidv4()
    const newTasks = R.mergeRight(tasks, {[newId]: {id: newId, content: taskName}})
    const newUnassigned = {...columns.unassigned, taskIds: [...columns.unassigned.taskIds, newId]}
    const newColumns = R.mergeRight(columns, { unassigned: newUnassigned })
    const newState = R.mergeRight(state, { tasks: newTasks, columns: newColumns })
    return newState
  })

  const onDragEnd = ({source, destination, draggableId}) => {
    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) return
   
    setState(state => {
      const start = state.columns[source.droppableId]
      const finish = state.columns[destination.droppableId]

      if (start === finish) { // if we're moving in same column (e.g. reordering unassigned tasks)
        const newTaskIds = R.insert(destination.index, draggableId, R.remove(source.index, 1, start.taskIds))

        const newColumn = {
          ...start,
          taskIds: newTaskIds
        }

        const newState = {
          ...state,
          columns: { 
            ...state.columns,
            [newColumn.id]: newColumn
          }
        }

        return newState
      }

      // if moving between columns...
      const startTaskIds = R.remove(source.index, 1, start.taskIds)
      const newStart = {
        ...start,
        taskIds: startTaskIds
      }
      const finishTaskIds = R.insert(destination.index, draggableId, finish.taskIds)
      const newFinish = {
        ...finish,
        taskIds: finishTaskIds
      }

      const newState = {
        ...state,
        columns: { 
          ...state.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish
        }
      }

      return newState
    })
  }

  return (
    <ContainerVertical>
      <AddTasks handleAddTask={handleAddTask}/> 
      <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          {state.columnOrder.map(columnId => {
            const column = state.columns[columnId]
            const tasks = column.taskIds.map(taskId => state.tasks[taskId])

            return <Column key={column.id} column={column} tasks={tasks} />
          })}
        </Container>
      </DragDropContext>
      <LinkMaker {...toDeveloperTasks(state)}/>
    </ContainerVertical>
  )
}

const toDeveloperTasks = state => ({ 
  tasks: state.tasks, 
  developers: R.omit(['unassigned'], state.columns)
})