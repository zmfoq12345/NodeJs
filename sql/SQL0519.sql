create table software.member (
	id varchar(100) not null,
    pw varchar(100) not null,
    nickname varchar(100) not null
);

SELECT * FROM software.member;

insert into software.member value( "hot", "123", "hotTea");
insert into software.member value( "smart", "222", "media");
insert into software.member value( "soft", "000", "ware");

delete from software.member where (id = "smart");