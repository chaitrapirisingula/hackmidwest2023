from fastapi import FastAPI, File, UploadFile
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

@app.post('/upload_file')
async def upload_image(file_upload: UploadFile):
    print(file_upload)
    data = await file_upload.read()
    print(data)

app.include_router(user_router, tags=["users"], prefix="/users")



