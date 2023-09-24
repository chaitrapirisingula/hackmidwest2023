from fastapi import FastAPI, File, UploadFile
from face_recognizer.detector import add_image
from dotenv import dotenv_values
from pymongo.mongo_client import MongoClient
from routes import router as user_router

config = dotenv_values(".env")

app = FastAPI()

@app.on_event("startup")
def startup_db_client():
    app.mongodb_client = MongoClient(config["ATLAS_URI"])
    app.database = app.mongodb_client[config["DB_NAME"]]
    print("Connected to the MongoDB database!")

@app.on_event("shutdown")
def shutdown_db_client():
    app.mongodb_client.close()

@app.post('/test')
async def test_me():
    print('hello')

app.include_router(user_router, tags=["users"], prefix="/users")



