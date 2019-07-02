-- Creates the "glt" database --
CREATE DATABASE glt;

USE glt;

INSERT INTO glt.requests (id, time, date, accepted, createdAt, updatedAt, userId, trainerId)
VALUES (1,"12:00 PM", 7/9/2019, false, "2019-06-28 16:03:21", "2019-06-28 16:03:21", 1, 1 ), (2,"5:00 PM", 7/19/2019, true, "2019-06-28 16:03:21", "2019-06-28 16:03:21", 1, 2 );