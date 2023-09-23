from fastapi import APIRouter, Body, Request, Response, HTTPException, status, File, UploadFile, Depends
from fastapi.encoders import jsonable_encoder
from typing import List
from face_recognizer.detector import add_image


from models import User, UserUpdate, FileOptions

router = APIRouter()

@router.get("/get_users", response_description="List all users", response_model=List[User])
async def list_users(request: Request):
    users = list(request.app.database["users"].find())
    return users

@router.post('/upload_file')
async def upload_image(file_upload: UploadFile):
    print(file_upload)
    data = await file_upload.read()
    print(data)

@router.post('/test')
async def test_me():
    print('hello')

@router.post("/api/v1/profile/upload")
async def upload_image(image: UploadFile):
    
    try:
        add_image(image.file, image.filename )
    except Exception as e:
        print(e)
        return {"Image Failed To Upload"}
    
    return {"Image Uploaded Successfully"}