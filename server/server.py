import os
from mysql import connector
from dotenv import load_dotenv
from data import multiple_records

# Access environment variables
load_dotenv()
PASSWORD = os.getenv("PASSWORD")

try: 
    # Connect to server
    with connector.connect(
        host = "localhost",
        user = "root",
        password = PASSWORD
    ) as database: 
        
        # Create a database
        create_db = "CREATE DATABASE weather"
        with database.cursor() as cursor: 
            cursor.execute(create_db)
# Catch errors
except connector.Error as e:
    print(e)

create_weather_table = """
CREATE TABLE records(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    temp FLOAT,
    city VARCHAR(100),
    date DATE
)
"""

insert_multiple_records  = "INSERT INTO records (temp, city, date)\
    VALUES (%s, %s, %s)"

try:
    # Connect to server
    with connector.connect(
        host = "localhost",
        user = "root",
        password = PASSWORD,
        database = "weather" 
    ) as existing_database:
        
        # Create cursor object
        with existing_database.cursor() as cursor: 
            cursor.execute(create_weather_table)
            existing_database.commit()
            cursor.executemany(insert_multiple_records , multiple_records)
            existing_database.commit()
            

except connector.Error as e: 
    print(e)
