import React, { useState } from "react";
import { Form, Button, Icon } from "semantic-ui-react";

const FormExampleField = () => {
  // Initialize state for each category
  const [allergiesList, setAllergiesList] = useState([""]);
  const [conditionsList, setConditionsList] = useState([""]);
  const [surgeriesList, setSurgeriesList] = useState([""]);
  const [medicationsList, setMedicationsList] = useState([""]);

  // Initialize state for simple string variables
  const [bloodType, setBloodType] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const handleAddInput = (list, setList) => {
    setList([...list, ""]); // Add a new empty input field to the specified list
  };

  const handleRemoveInput = (list, setList, index) => {
    const updatedList = [...list];
    updatedList.splice(index, 1); // Remove the input field at the given index
    setList(updatedList);
  };

  const handleInputChange = (list, setList, index, value) => {
    const updatedList = [...list];
    updatedList[index] = value;
    setList(updatedList);
  };

  const handleSubmit = () => {
    // Gather the data and update state variables here
    const formData = {
      allergies: allergiesList,
      conditions: conditionsList,
      surgeries: surgeriesList,
      medications: medicationsList,
      bloodType,
      weight,
      height
    };

    // You can perform further actions with the formData object here, such as sending it to an API or processing it in your application.

  //   const fd = new FormData();
  //   fd.append('file_upload', photo)
  //   console.log(formData)
    
  //   try {
  //       setLoading(true);
  //       const endpoint = "http://localhost:8000/users/insert_user";
  //       const response = await fetch(endpoint, {
  //           method: "POST",
  //           body: formData
  //       });
  //       console.log(response);
  //       setFoundUser(response);

  //       if (!response.ok) {
  //         console.error('An error occured!');
  //         setNoMatch(true);
  //       }

  //   } catch(error) {
  //     console.error(error);
  //     setNoMatch(true);
  //   } finally {
  //       setLoading(false);
  //   }
  }
  // For now, let's log the data to the console
  // console.log(formData);
  

  return (
    <Form>
      {/* Allergies */}
      <div>
        <label>Allergies</label>
        {allergiesList.map((input, index) => (
          <div key={index}>
            <Form.Field>
              <input
                value={input}
                onChange={(e) =>
                  handleInputChange(
                    allergiesList,
                    setAllergiesList,
                    index,
                    e.target.value
                  )
                }
              />
            </Form.Field>
            {index > 0 && (
              <Button
                icon
                color="red"
                onClick={() =>
                  handleRemoveInput(allergiesList, setAllergiesList, index)
                }
              >
                <Icon name="remove" />
                Remove Input
              </Button>
            )}
          </div>
        ))}
        <Button onClick={() => handleAddInput(allergiesList, setAllergiesList)}>
          Add Allgery
        </Button>
      </div>

      {/* Conditions */}
      <div>
        <label>Conditions</label>
        {conditionsList.map((input, index) => (
          <div key={index}>
            <Form.Field>
              <input
                value={input}
                onChange={(e) =>
                  handleInputChange(
                    conditionsList,
                    setConditionsList,
                    index,
                    e.target.value
                  )
                }
              />
            </Form.Field>
            {index > 0 && (
              <Button
                icon
                color="red"
                onClick={() =>
                  handleRemoveInput(conditionsList, setConditionsList, index)
                }
              >
                <Icon name="remove" />
                Remove Input
              </Button>
            )}
          </div>
        ))}
        <Button
          onClick={() => handleAddInput(conditionsList, setConditionsList)}
        >
          Add Condition
        </Button>
      </div>

      {/* Surgeries */}
      <div>
        <label>Surgeries</label>
        {surgeriesList.map((input, index) => (
          <div key={index}>
            <Form.Field>
              <input
                value={input}
                onChange={(e) =>
                  handleInputChange(
                    surgeriesList,
                    setSurgeriesList,
                    index,
                    e.target.value
                  )
                }
              />
            </Form.Field>
            {index > 0 && (
              <Button
                icon
                color="red"
                onClick={() =>
                  handleRemoveInput(surgeriesList, setSurgeriesList, index)
                }
              >
                <Icon name="remove" />
                Remove Input
              </Button>
            )}
          </div>
        ))}
        <Button onClick={() => handleAddInput(surgeriesList, setSurgeriesList)}>
          Add Surgery
        </Button>
      </div>

      {/* Medications */}
      <div>
        <label>Medications</label>
        {medicationsList.map((input, index) => (
          <div key={index}>
            <Form.Field>
              <input
                value={input}
                onChange={(e) =>
                  handleInputChange(
                    medicationsList,
                    setMedicationsList,
                    index,
                    e.target.value
                  )
                }
              />
            </Form.Field>
            {index > 0 && (
              <Button
                icon
                color="red"
                onClick={() =>
                  handleRemoveInput(medicationsList, setMedicationsList, index)
                }
              >
                <Icon name="remove" />
                Remove Input
              </Button>
            )}
          </div>
        ))}
        <Button
          onClick={() => handleAddInput(medicationsList, setMedicationsList)}
        >
          Add Medication
        </Button>
      </div>
      {/* Blood Type */}
      <div>
        <label>Blood Type</label>
        <Form.Field>
          <input
            value={bloodType}
            onChange={(e) => setBloodType(e.target.value)}
          />
        </Form.Field>
      </div>

      {/* Weight */}
      <div>
        <label>Weight (lbs)</label>
        <Form.Field>
          <input value={weight} onChange={(e) => setWeight(e.target.value)} />
        </Form.Field>
      </div>

      {/* Height */}
      <div>
        <label>Height (inches)</label>
        <Form.Field>
          <input value={height} onChange={(e) => setHeight(e.target.value)} />
        </Form.Field>
      </div>

      <Button onClick={handleSubmit}>Submit</Button>
    </Form>
  );
};

export default FormExampleField;