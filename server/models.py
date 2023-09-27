import uuid
from typing import Optional
from pydantic import BaseModel, Field

class FileOptions(BaseModel):
    FileName: str = Field(...)
    FileDesc: str = Field(...)
    FileType: Optional[str]

class User(BaseModel):
    # match to okta
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    admin: str = Field(...)
    firstName: str = Field(...)
    lastName: str = Field(...)
    # M/F
    sex: str = Field(...)
    email: str = Field(...)
    phone: str = Field(...)
    address: str = Field(...)
    birthday: str = Field(...)
    race: str = Field(...)
    bloodType: str = Field(...)
    weight: str = Field(...)
    height: str = Field(...)
    # list 
    allergies: str = Field(...)
    conditions: str = Field(...)
    surgeries: str = Field(...)
    medication: str = Field(...)
    contact: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "_id": "066de609-b04a-4b30-b46c-32537c7f1f6e",
                "admin" : "0",
                "firstName": "Chaitra",
                "lastName": "Pirisingula",
                "phone":"...",
                "sex" : "...",
                "email":  "...",
                "address":  "...",
                "birthday":  "...",
                "race":  "...",
                "bloodType":  "...",
                "weight":  "...",
                "height":  "...",
                "allergies":  "...",
                "conditions":  "...",
                "surgeries":  "...",
                "medication":  "...",
                "contact" :"..."
            }
        }

class UserUpdate(BaseModel):
    title: Optional[str]
    author: Optional[str]
    synopsis: Optional[str]

    class Config:
        arbitrary_types_allowed = True
        schema_extra = {
            "example": {
                "admin" : "0",
                "firstName": "Chaitra",
                "lastName": "Pirisingula",
                "phone":"...",
                "sex" : "...",
                "email":  "...",
                "phone":  "...",
                "address":  "...",
                "birthday":  "...",
                "race":  "...",
                "bloodType":  "...",
                "weight":  "...",
                "height":  "...",
                "allergies":  "...",
                "conditions":  "...",
                "surgeries":  "...",
                "medication":  "...",
                "contact" :"..."
            }
        }