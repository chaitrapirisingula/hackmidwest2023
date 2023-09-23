from fastapi import APIRouter, Body, Request, Response, HTTPException, status, File, UploadFile, Depends
from fastapi.encoders import jsonable_encoder
from typing import List

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