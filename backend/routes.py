from fastapi import APIRouter, Body, Request, Response, HTTPException, status, File, UploadFile, Depends, Response
from fastapi.encoders import jsonable_encoder
from typing import List
from models import User, UserUpdate, FileOptions
from face_recognizer.detector import add_image, recognize_faces
import json

router = APIRouter()

@router.put("/{id}", response_description="Update a user", response_model=User)
def update_user(id: str, request: Request, user):
    user = json.loads(user)
    user = {k: v for k, v in user.items() if v is not None}
    if len(user) >= 1:
        update_result = request.app.database["users"].update_one({"_id": id}, {"$set": user})

        if update_result.modified_count == 0:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with ID {id} not found")

    if (existing_user := request.app.database["users"].find_one({"_id": id})) is not None:
        return existing_user

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with ID {id} not found")

@router.post("/insert_user", response_description="insert user", response_model=User)
def insert_user(request: Request, user: User = Body(...)):
    user = jsonable_encoder(user)
    new_user =  request.app.database["users"].insert_one(user)
    created_user =  request.app.database["users"].find_one(
       {"_id": new_user.inserted_id}
    )
    return created_user

@router.post("/api/v1/profile/upload")
async def upload_image(image: UploadFile):

    try:
        img_path = image.filename.split(".")
        add_image(image.file, img_path[0] )
    except Exception as e:
        print(e)
        return {"Image Failed To Upload"} 
    return {"Image Uploaded Successfully"}

@router.post('/upload_file')
async def upload_image(file_upload: UploadFile):
    print(file_upload)
    data = await file_upload.read()
    print(data)

@router.post('/test')
async def test_me():
    print('hello')

@router.post("/api/v1/profile/upload")
async def upload_image(image: UploadFile, response: Response, request: Request):

    try:
        add_image(image.file, image.filename )
    except Exception as e:
        print(e)
        response.status_code = status.HTTP_404_NOT_FOUND
        return {"Image Failed To Upload"}
    
    return {"Image Uploaded Successfully"}


@router.post("/api/v1/profile/admin/upload")
async def upload_image(image: UploadFile, response: Response, request: Request):
    
    try: 
        print("Here")
        names = recognize_faces(image = image.file )
        print(names)
        user_data =  request.app.database["users"].find_one(
       {"_id": names[0]}
        )


    except Exception as e:
        print(e)
        response.status_code = status.HTTP_404_NOT_FOUND
        return {"User Not Found"}

    return user_data

