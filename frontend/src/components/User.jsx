import React from 'react';
import { Table } from 'semantic-ui-react';

const User = ( { userInfo } ) => {
  return (
    <div>
       <img src={userInfo.image} alt="user" />
       <Table>
       Sex: {userInfo.sex}
       Email: {userInfo.email}
       Phone: {userInfo.phone}
       Address: {userInfo.address}
       DOB: {userInfo.birthday}
       Race: {userInfo.race}
       Blood Type: {userInfo.bloodType}
       Weight: {userInfo.weight}
       Height: {userInfo.height}
       Allergies: {userInfo.allergies}
       Conditions: {userInfo.conditions}
       Medication: {userInfo.medication}
       Surgeries: {userInfo.surgeries}
       Emergency Contact: {userInfo.contact}
       </Table>
    </div>
  );
};

export default User;
