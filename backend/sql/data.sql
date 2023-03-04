INSERT INTO dummy (created) VALUES (current_timestamp);
INSERT INTO emailtable(personemail, personpassword) VALUES ('partickchen@ucsc.edu', 'partick');
INSERT INTO emailtable(personemail, personpassword) VALUES ('lanceweenie@ucsc.edu', 'lance');
INSERT INTO emailtable(personemail, personpassword) VALUES ('edwin@ucsc.edu', 'edwin');
INSERT INTO emailtable(personemail, personpassword) VALUES ('ben@ucsc.edu', 'ben');
INSERT INTO emailtable(personemail, personpassword) VALUES ('steven@ucsc.edu', 'steven');

-- INSERT INTO stockTable(personemail, ticker,price, change, percentChange) VALUES ('ben@ucsc.edu', 'TSLA', 84.69,'-1.22', '(-1.42%)');
INSERT INTO stockTable(personemail, ticker,price, change, percentChange) VALUES('lanceweenie@ucsc.edu', 'UCSC', 420, '10,00', '(-1.00)');