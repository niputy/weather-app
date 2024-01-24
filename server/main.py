from fastapi import FastAPI

import os
from mysql import connector
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

# Access environment variables
load_dotenv()
PASSWORD = os.getenv("PASSWORD")


app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/weather")
def read_root():
    try:
        # Connect to existing database
        with connector.connect(
            host = "localhost",
            user = "root",
            password = PASSWORD,
            database = "weather"
        ) as existing_database:
            
            # Create cursor object
            select_specific_cols = "SELECT * FROM records"
            with existing_database.cursor() as cursor:
                cursor.execute(select_specific_cols)
                
                # Display returned data
                returned_data = cursor.fetchall()
                for result in returned_data:
                    print(result)
        
    except connector.Error as e: 
        return {"error": e}
    return {"res": returned_data}
