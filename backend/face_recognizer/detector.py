from pathlib import Path
import pickle
import face_recognition
from collections import Counter

DEFAULT_ENCODINGS_PATH = Path("face_recognizer/output/encodings.pkl")

Path("face_recognizer/training").mkdir(exist_ok=True)
Path("face_recognizer/output").mkdir(exist_ok=True)
Path("face_recognizer/validation").mkdir(exist_ok=True)

def encode_known_faces(
    model: str = "hog", encodings_location: Path = DEFAULT_ENCODINGS_PATH
) -> None:
    names = []
    encodings = []
    for filepath in Path("face_recognizer/training").glob("*/*"):
        name = filepath.parent.name
        image = face_recognition.load_image_file(filepath)

        face_locations = face_recognition.face_locations(image, model=model)
        face_encodings = face_recognition.face_encodings(image, face_locations)
        name_encodings = None

        for encoding in face_encodings:
            names.append(name)
            encodings.append(encoding)
        
        name_encodings = {"names": names, "encodings": encodings}

    with encodings_location.open(mode="wb") as f:
        pickle.dump(name_encodings, f)





def recognize_faces(
    image_location: str,
    model: str = "hog",
    encodings_location: Path = DEFAULT_ENCODINGS_PATH, image = None
) -> None:
    with encodings_location.open(mode="rb") as f:
        loaded_encodings = pickle.load(f)
    
    
    if image:
        input_image = face_recognition.load_image_file(image)
    else:
        input_image = face_recognition.load_image_file(image_location)

    input_face_locations = face_recognition.face_locations(
        input_image, model=model
    )
    input_face_encodings = face_recognition.face_encodings(
        input_image, input_face_locations
    )

    names = []
    for bounding_box, unknown_encoding in zip(
        input_face_locations, input_face_encodings
    ):
        name = _recognize_face(unknown_encoding, loaded_encodings)
        if not name:
            name = "Unknown"
        else:
            names.append(name)
        print(name, bounding_box)
    return names



def _recognize_face(unknown_encoding, loaded_encodings):
    boolean_matches = face_recognition.compare_faces(
        loaded_encodings["encodings"], unknown_encoding
    )
    votes = Counter(
        name
        for match, name in zip(boolean_matches, loaded_encodings["names"])
        if match
    )
    if votes:
        return votes.most_common(1)[0][0]
    

def add_image(image, name, model = "hog", encodings_location: Path = DEFAULT_ENCODINGS_PATH):
    # Path(f'training/{name}').mkdir(exist_ok=True)
    # image.save(f'training/{name}/{image.filename}')
    if len(recognize_faces(image)):
        print("Image already exists")
        return "Not added"
    else:
        with encodings_location.open(mode="rb") as f:
            loaded_encodings = pickle.load(f)
        names = loaded_encodings["names"]
        encodings = loaded_encodings["encodings"]
        input_image = face_recognition.load_image_file(image)
        face_locations = face_recognition.face_locations(input_image, model=model)
        face_encodings = face_recognition.face_encodings(input_image, face_locations)
        name_encodings = None
        for encoding in face_encodings:
            names.append(name)
            encodings.append(encoding)
        
        name_encodings = {"names": names, "encodings": encodings}
        with encodings_location.open(mode="wb") as f:
            pickle.dump(name_encodings, f)
        
        return "Added"
        



          

    
    


    


#recognize_faces("jack.jpg")
#input_image = 'jack.jpg'
#add_image(input_image, "TW", image_path=input_image)