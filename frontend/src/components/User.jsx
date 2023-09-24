import React from 'react';
import { Table, Grid } from 'semantic-ui-react';

const User = ({ patient }) => {
  return (
    <Grid stackable columns={1}>
      <Grid.Column>
        <Table celled>
          <Table.Body>
            <Table.Row>
              <Table.Cell><strong>Name</strong></Table.Cell>
              <Table.Cell>{patient?.firstName + ' ' + patient?.lastName}</Table.Cell>
            </Table.Row>
            <Table.Row>
            <Table.Cell><strong>Phone</strong></Table.Cell>
              <Table.Cell>{patient?.phone}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><strong>Emergency Contacts</strong></Table.Cell>
              <Table.Cell>{patient?.contact}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><strong>Date of Birth</strong></Table.Cell>
              <Table.Cell>{patient?.birthday}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><strong>Sex</strong></Table.Cell>
              <Table.Cell>{patient?.sex}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><strong>Race</strong></Table.Cell>
              <Table.Cell>{patient?.race}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><strong>Blood Type</strong></Table.Cell>
              <Table.Cell>{patient?.bloodType}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><strong>Weight</strong></Table.Cell>
              <Table.Cell>{patient?.weight}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><strong>Height</strong></Table.Cell>
              <Table.Cell>{patient?.height}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><strong>Allergies</strong></Table.Cell>
              <Table.Cell>{patient?.allergies}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><strong>Conditions</strong></Table.Cell>
              <Table.Cell>{patient?.conditions}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><strong>Medication</strong></Table.Cell>
              <Table.Cell>{patient?.medication}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><strong>Surgeries</strong></Table.Cell>
              <Table.Cell>{patient?.surgeries}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Grid.Column>
    </Grid>
  );
};

export default User;
