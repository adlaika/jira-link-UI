import * as R from 'ramda'
import React, { useState } from "react";
import styled from 'styled-components';

const Container = styled.div`
  display: flex
  flex-direction: column;
`

const LinkContainer = styled.div`
  display: flex
  flex-direction: column;
`

const Row = styled.div`
  display: flex
`
export default function LinkMaker ({tasks, developers}) {

  const [links, setLinks] = useState([]);

  const handleClick = ({ tasks, developers }) => {
    const links = R.pipe(
      R.map(({title, taskIds}) => 
        R.values(R.map(taskId => 
          makeJiraLink({assignee: title, developer: title, summary: tasks[taskId].content})
          , taskIds))
      ),
      R.values,
      R.flatten
    )(developers)
    setLinks(links)
  }

  return (
    <Container>
      <button onClick={() => handleClick({tasks, developers})}>Generate JIRA links for assigned tasks</button>
      <LinkContainer>
        { links.map((link, index) => <Row key={link + index}> <a href={link}>{link}</a> </Row>)}
      </LinkContainer>
    </Container>
  );
}

const makeJiraLink = ({
    assignee,
    developer,
    summary,
    projectId = "10200", // DEV
    issueType = "4", // Improvement
    sprintId = "1283", // 184
    epic = "DEV-124089",
    qa = "rebecca.hilburn@logicmonitor.com",
    uxOwner = "stephanie.rose@logicmonitor.com",
    storyPoints = "3",
    uxReviewRequired = false,
    pm = "peter.stradinger@logicmonitor.com", // Product Manager
    originalEstimate = "1d",
    reviewer = "peter.stradinger@logicmonitor.com",
    labels = "uiv4",
    scrumTeamId = "17144", // SB Platform
    teamId = "277", // SB Team: UFO
    workTypeId = "17151", // UI
    priority = "4",
    componentIds = "13627", // UI
}) => {
  if (assignee === undefined) {
    return "assignee required!";
  }
  const uxReviewStatus = uxReviewRequired ? "16605" : "16606";
  return `https://jira.logicmonitor.com/secure/CreateIssueDetails!init.jspa?pid=${projectId}&issuetype=${issueType}&customfield_11000=${sprintId}&customfield_11300=${epic}&customfield_11304=${developer}&customfield_10400=${qa}&customfield_10203=${storyPoints}&customfield_17501=${uxOwner}&customfield_17502=${uxReviewStatus}&customfield_16803=&customfield_11900=&customfield_13908=${pm}&timetracking_originalestimate=${originalEstimate}&customfield_10401=${reviewer}&components=${componentIds}&labels=${labels}&customfield_18109=${scrumTeamId}&customfield_14400=${teamId}&customfield_18110=${workTypeId}&assignee=${assignee}&priority=${priority}&summary=${summary}`;
};