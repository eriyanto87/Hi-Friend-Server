CREATE TABLE "user" (
    "id" INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY, 
    "username" TEXT NOT NULL UNIQUE, 
    "password" TEXT NOT NULL, 
    "first_name" TEXT NOT NULL, 
    "last_name" TEXT NOT NULL
); 