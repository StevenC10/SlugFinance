--
-- All SQL statements must be on a single line and end in a semicolon.
--

-- Dummy table --
DROP TABLE IF EXISTS dummy;
CREATE TABLE dummy (created TIMESTAMP WITH TIME ZONE);
-- DROP TABLE IF EXISTS emailtable cascade;
-- DROP TABLE IF EXISTS Mailbox cascade;
-- DROP TABLE IF EXISTS mail;
-- DROP TABLE IF EXISTS users
CREATE TABLE emailtable(userID INT GENERATED ALWAYS AS IDENTITY, personemail VARCHAR, personpassword VARCHAR, PRIMARY KEY (personemail, personpassword));
CREATE TABLE cryptpasswords(pw VARCHAR, personemail VARCHAR, personpassword VARCHAR, FOREIGN KEY (personemail, personpassword) REFERENCES emailtable)