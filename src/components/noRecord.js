import React from 'react';
import { Header, Icon } from 'semantic-ui-react'

const HeaderExampleSettingsIcon = () => (
  <Header as='h2' icon style={{ marginTop: '150px'}}>
    <Icon name='settings' color='blue'/>
    No Record Found
    <Header.Subheader>The student record you are searching for is not available</Header.Subheader>
  </Header>
)

export default HeaderExampleSettingsIcon