from fastapi import APIRouter, Body, Request, Response, HTTPException, status
from fastapi.encoders import jsonable_encoder
from typing import List

from models import User, UserUpdate

router = APIRouter()

@router.get("/", response_description="List all books", response_model=List[User])
def list_users(request: Request):
    users = list(request.app.database["users"].find())
    return users